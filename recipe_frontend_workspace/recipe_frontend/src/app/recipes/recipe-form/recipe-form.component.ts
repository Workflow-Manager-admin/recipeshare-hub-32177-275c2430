import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEdit: boolean = false;
  imageUrl: string = '';
  imageFile: File | null = null;
  loading = false;

  constructor() {
    const fb = new FormBuilder();
    this.recipeForm = fb.group({
      title: ['', Validators.required],
      description: [''],
      ingredients: fb.array([fb.control('')]),
      steps: fb.array([fb.control('')]),
      image: [null]
    });
  }

  get ingredients(): FormArray { return this.recipeForm.get('ingredients') as FormArray; }
  get steps(): FormArray { return this.recipeForm.get('steps') as FormArray; }

  ingredientControl(i: number): FormControl {
    return this.ingredients.at(i) as FormControl;
  }
  stepControl(i: number): FormControl {
    return this.steps.at(i) as FormControl;
  }

  private runTimeout(handler: () => void, ms: number) {
    if (typeof setTimeout === 'function') setTimeout(handler, ms);
    else handler();
  }

  ngOnInit() {
    // Demo logic, not using ActivatedRoute for id. Add if needed in a real app.
    // if (this.route.snapshot.paramMap.get('id')) {
    //   this.isEdit = true;
    //   this.loadRecipe(+this.route.snapshot.paramMap.get('id')!);
    // }
  }
  addIngredient() { this.ingredients.push(new FormControl('')); }
  removeIngredient(i: number) { this.ingredients.removeAt(i); }
  addStep() { this.steps.push(new FormControl('')); }
  removeStep(i: number) { this.steps.removeAt(i); }
  onFileChange(e: any) {
    const f = e.target.files[0];
    this.imageFile = f;
    const reader = new FileReader();
    reader.onload = () => this.imageUrl = reader.result as string;
    reader.readAsDataURL(f);
  }
  submit() {
    this.loading = true;
    // Placeholder for API call
    this.runTimeout(() => {
      this.loading = false;
      // router logic stub (would be injected in real code)
    }, 1000);
  }
  private loadRecipe() {
    // Placeholder: fetch recipe; fill form
    this.recipeForm.patchValue({
      title: 'Edit - Recipe',
      description: 'This is a recipe description.'
    });
    this.ingredients.setValue(['Egg', 'Milk', 'Flour']);
    this.steps.setValue(['Mix ingredients', 'Bake 20min']);
    this.imageUrl = '';
  }
}
