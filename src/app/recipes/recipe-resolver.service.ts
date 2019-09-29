import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared-recources/data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<Recipe[]> {

    constructor(private dsService: DataStorageService, private recipeService: RecipeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length !== 0)
            return recipes;
        return this.dsService.fetchRecipes();
    }
}