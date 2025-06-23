import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-page-not-found',
  template: `<div class="notfound"><h1>404 - Not found</h1><p>The page you are looking for does not exist.</p></div>`,
  styleUrl: './page-not-found.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class PageNotFoundComponent {}
