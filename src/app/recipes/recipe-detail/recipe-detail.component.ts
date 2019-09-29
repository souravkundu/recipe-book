import { Component, OnInit, Input, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared-recources/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
// tslint:disable-next-line: no-input-rename
  id: number;
  selectedRecipe: Recipe;
  videoUrl: SafeUrl = '';

  constructor(private recipeService: RecipeService , private route: ActivatedRoute, private router : Router, private sanitizer: DomSanitizer) { 
   
  }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.selectedRecipe = this.recipeService.getRecipeById(this.id);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedRecipe.videoPath);
        console.log(this.selectedRecipe.videoPath);
        console.log( this.videoUrl);
      }
    );
  }

  addToshopList() {
   this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredientList);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigateByUrl('');
  }
}
