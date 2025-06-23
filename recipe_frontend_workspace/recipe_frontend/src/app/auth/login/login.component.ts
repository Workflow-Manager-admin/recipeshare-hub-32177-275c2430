import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor() {
    const fb = new FormBuilder();
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Helper for SSR-safe setTimeout
  private runTimeout(handler: () => void, ms: number) {
    if (typeof setTimeout === 'function') setTimeout(handler, ms);
    else handler();
  }

  login() {
    this.loading = true;
    this.error = null;
    // Placeholder: API call for login here
    this.runTimeout(() => {
      // fake-success flow
      this.loading = false;
      // router logic stub (would be injected in real code)
    }, 800);
  }
}
