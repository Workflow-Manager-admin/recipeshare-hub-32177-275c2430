import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class RecipeDetailComponent implements OnInit {
  recipe: any = null;
  loading: boolean = true;

  private runTimeout(handler: () => void, ms: number) {
    if (typeof setTimeout === 'function') setTimeout(handler, ms);
    else handler();
  }

  ngOnInit() {
    // Placeholder: fetch API by route param id
    this.runTimeout(() => {
      this.recipe = {
        id: 1,
        title: 'Best Chocolate Cake',
        description: 'Rich, moist chocolate cake for all occasions.',
        image: '',
        ingredients: [
          '2 cups flour',
          '1.5 cups sugar',
          '1 cup cocoa powder'
        ],
        steps: [
          'Preheat oven to 350°F (175°C).',
          'Mix dry ingredients well.',
          'Bake for 30 minutes.'
        ],
        author: 'testuser',
      };
      this.loading = false;
    }, 700);
  }
}
