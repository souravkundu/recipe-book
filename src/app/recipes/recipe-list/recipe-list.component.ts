import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  editMode = false;
  link = 'new';
  recipes: Recipe[];
  loading = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    // console.log('recipe list on init');
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeChange.subscribe(
      (recipes) => {
        this.editMode = false;
        if (!recipes) {
          this.loading = true;
        } else {
          this.loading = false;
          this.recipes = recipes;
        }

      }
    );
  }
  onSelectRecipe() {
    this.editMode = false;
    this.link = 'new';
  }

  onClick() {
    if (this.editMode) {
      this.link = 'new';
    } else {
      this.link = '';
    }
    this.editMode = !this.editMode;
  }
}
