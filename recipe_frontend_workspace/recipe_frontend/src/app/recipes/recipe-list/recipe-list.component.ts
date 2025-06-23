import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, SearchBarComponent]
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  filtered: any[] = [];
  loading = true;

  ngOnInit() {
    // Placeholder: API call for recipes
    if (typeof setTimeout === 'function') {
      setTimeout(() => {
        this.recipes = [
          { id: 1, title: 'Best Chocolate Cake', description: 'Rich, moist chocolate cake for all occasions.', image: '' },
          { id: 2, title: 'Healthy Veggie Stir-Fry', description: 'Colorful veggies quick stir-fried and perfectly seasoned.', image: '' }
        ];
        this.filtered = [...this.recipes];
        this.loading = false;
      }, 800);
    } else {
      this.recipes = [
        { id: 1, title: 'Best Chocolate Cake', description: 'Rich, moist chocolate cake for all occasions.', image: '' },
        { id: 2, title: 'Healthy Veggie Stir-Fry', description: 'Colorful veggies quick stir-fried and perfectly seasoned.', image: '' }
      ];
      this.filtered = [...this.recipes];
      this.loading = false;
    }
  }

  onSearch(term: string) {
    this.filtered = this.recipes.filter(r => r.title.toLowerCase().includes(term.toLowerCase()));
  }
}
