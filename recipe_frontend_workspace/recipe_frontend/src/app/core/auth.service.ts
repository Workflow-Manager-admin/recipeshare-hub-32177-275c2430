import { Injectable } from '@angular/core';

// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage(): Storage | null {
    try {
      return typeof localStorage !== 'undefined' ? localStorage : null;
    } catch {
      return null;
    }
  }
  getToken(): string | null {
    const s = this.storage();
    return s ? s.getItem('token') : null;
  }
  setToken(token: string) {
    const s = this.storage();
    s && s.setItem('token', token);
  }
  clearToken() {
    const s = this.storage();
    s && s.removeItem('token');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
