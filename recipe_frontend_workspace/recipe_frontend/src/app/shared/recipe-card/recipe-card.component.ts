import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class RecipeCardComponent {
  @Input() recipe?: any;

  goToRecipe() {
    // Navigation handled by routerLink elsewhere or callback if needed
  }
}
