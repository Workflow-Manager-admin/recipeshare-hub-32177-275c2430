from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Recipe, RecipeImage


# PUBLIC_INTERFACE
class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile."""

    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'created_at']


# PUBLIC_INTERFACE
class UserSerializer(serializers.ModelSerializer):
    """Serializer for Django user + profile."""
    profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']


# PUBLIC_INTERFACE
class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        UserProfile.objects.create(user=user)
        return user


# PUBLIC_INTERFACE
class RecipeImageSerializer(serializers.ModelSerializer):
    """Serializer for images of a recipe."""

    class Meta:
        model = RecipeImage
        fields = ['id', 'image', 'uploaded_at']


# PUBLIC_INTERFACE
class RecipeSerializer(serializers.ModelSerializer):
    """Serializer for recipe objects, includes images and author."""
    author = UserSerializer(read_only=True)
    images = RecipeImageSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'author', 'title', 'description', 'instructions', 'ingredients',
            'cuisine', 'prep_time', 'cook_time', 'created_at', 'updated_at',
            'is_public', 'images'
        ]


# PUBLIC_INTERFACE
class RecipeCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating recipes (without nested objects)."""

    class Meta:
        model = Recipe
        fields = [
            'title', 'description', 'instructions', 'ingredients',
            'cuisine', 'prep_time', 'cook_time', 'is_public'
        ]
