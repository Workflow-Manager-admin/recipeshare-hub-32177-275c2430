import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor() {
    const fb = new FormBuilder();
    this.registerForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private runTimeout(handler: () => void, ms: number) {
    if (typeof setTimeout === 'function') setTimeout(handler, ms);
    else handler();
  }

  register() {
    this.loading = true;
    this.error = null;
    // Placeholder: API call
    this.runTimeout(() => {
      // fake
      this.loading = false;
      // router logic stub (would be injected in real code)
    }, 900);
  }
}
