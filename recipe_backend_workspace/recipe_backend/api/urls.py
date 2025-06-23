from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    health, RegisterView, login_view, ProfileView,
    RecipeViewSet, RecipeImageViewSet,
)

router = DefaultRouter()
router.register('recipes', RecipeViewSet, basename='recipe')
router.register('recipe-images', RecipeImageViewSet, basename='recipeimage')

urlpatterns = [
    path('health/', health, name='Health'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('', include(router.urls)),
]
