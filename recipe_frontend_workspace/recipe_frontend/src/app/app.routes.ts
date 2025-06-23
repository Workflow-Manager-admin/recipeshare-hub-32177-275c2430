import { Routes } from '@angular/router';

// PUBLIC_INTERFACE
export const routes: Routes = [
  // Auth
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },

  // Recipes
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'recipes', loadComponent: () => import('./recipes/recipe-list/recipe-list.component').then(m => m.RecipeListComponent) },
  { path: 'recipes/new', loadComponent: () => import('./recipes/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent) },
  { path: 'recipes/:id', loadComponent: () => import('./recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent) },
  { path: 'recipes/:id/edit', loadComponent: () => import('./recipes/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent) },

  // 404 - fallback
  { path: '**', loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];
