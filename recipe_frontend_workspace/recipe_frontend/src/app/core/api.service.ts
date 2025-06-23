import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:3001/api'; // Django backend base

  // --- Auth ---
  login(data: { username: string, password: string }): Observable<any> {
    // return this.http.post(`${this.BASE_URL}/login/`, data);
    return of({ token: 'mocktoken' });
  }
  register(data: { username: string, email: string, password: string }): Observable<any> {
    // return this.http.post(`${this.BASE_URL}/register/`, data);
    return of({});
  }
  getProfile(): Observable<any> {
    return of({});
  }

  // --- Recipes ---
  getRecipes(): Observable<any[]> {
    return of([]);
  }
  getRecipe(id: number): Observable<any> {
    return of({});
  }
  addRecipe(recipe: any): Observable<any> {
    return of({});
  }
  updateRecipe(id: number, recipe: any): Observable<any> {
    return of({});
  }
  deleteRecipe(id: number): Observable<any> {
    return of({});
  }
}
