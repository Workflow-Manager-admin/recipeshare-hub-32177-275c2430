from django.db import models
from django.contrib.auth.models import User


# PUBLIC_INTERFACE
class UserProfile(models.Model):
    """Extends Django User with additional profile information."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile({self.user.username})"


# PUBLIC_INTERFACE
class Recipe(models.Model):
    """Model for storing recipe details."""
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructions = models.TextField()
    ingredients = models.TextField()
    cuisine = models.CharField(max_length=100, blank=True)
    prep_time = models.PositiveIntegerField(
        help_text="Preparation time in minutes", blank=True, null=True
    )
    cook_time = models.PositiveIntegerField(
        help_text="Cooking time in minutes", blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return self.title


# PUBLIC_INTERFACE
class RecipeImage(models.Model):
    """Model for handling recipe images."""
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='recipe_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.recipe.title}"
