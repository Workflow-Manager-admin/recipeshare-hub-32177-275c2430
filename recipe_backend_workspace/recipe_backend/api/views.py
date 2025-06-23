from rest_framework import generics, permissions, viewsets, filters, status
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.models import Q

from .models import Recipe, RecipeImage
from .serializers import (
    UserSerializer, RegisterSerializer, UserProfileSerializer,
    RecipeSerializer, RecipeCreateUpdateSerializer, RecipeImageSerializer
)


@api_view(['GET'])
def health(request):
    """Health check endpoint."""
    return Response({"message": "Server is up!"})


# PUBLIC_INTERFACE
class RegisterView(generics.CreateAPIView):
    """Handles user registration."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# PUBLIC_INTERFACE
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """User login. Returns token/user data if successful."""
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


# PUBLIC_INTERFACE
class ProfileView(generics.RetrieveUpdateAPIView):
    """Current user's profile view."""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile


# PUBLIC_INTERFACE
class RecipeViewSet(viewsets.ModelViewSet):
    """Recipe CRUD, with search/filter and image upload."""
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'ingredients', 'cuisine']
    ordering_fields = ['created_at', 'title']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return RecipeCreateUpdateSerializer
        return RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_image(self, request, pk=None):
        """Upload image(s) for this recipe."""
        recipe = self.get_object()
        images = request.FILES.getlist('image')
        if not images:
            return Response(
                {'error': 'No images provided.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        for img in images:
            RecipeImage.objects.create(recipe=recipe, image=img)
        return Response({'status': 'images uploaded'})

    @action(detail=False, methods=['get'])
    def mine(self, request):
        """List recipes created by current user."""
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        recipes = Recipe.objects.filter(author=request.user)
        serializer = self.get_serializer(recipes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search recipes by keyword."""
        q = request.query_params.get('q', '')
        queryset = Recipe.objects.filter(
            Q(title__icontains=q)
            | Q(description__icontains=q)
            | Q(ingredients__icontains=q)
            | Q(cuisine__icontains=q)
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# PUBLIC_INTERFACE
class RecipeImageViewSet(viewsets.ModelViewSet):
    """CRUD for individual recipe images."""
    queryset = RecipeImage.objects.all()
    serializer_class = RecipeImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Must be created through /recipe/{id}/add_image/
        pass
