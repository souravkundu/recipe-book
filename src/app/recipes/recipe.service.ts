
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared-recources/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list-service';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService implements OnDestroy{

    ngOnDestroy() {
        console.log('destroy recipe service');
    }

    constructor(private shopService: ShoppingListService) {}

    recipeChange = new Subject<Recipe[]>();

    private recipes: Recipe[] = 
        [
            // new Recipe(
            //     'Test-1',
            //     ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, quibusdam!',
            //     // tslint:disable-next-line: max-line-length
            //     'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189',
            //     [
            //         new Ingredient('meat', 2),
            //         new Ingredient('onion', 4)
            //     ]
            // ),
            // new Recipe(
            //     'Test-2',
            //     ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, quibusdam!',
            //     // tslint:disable-next-line: max-line-length
            //     'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189',
            //     [
            //         new Ingredient('meat', 2),
            //         new Ingredient('onion', 4)
            //     ]
            // ),
            // new Recipe(
            //     'Test-3',
            //     ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, quibusdam!',
            //     // tslint:disable-next-line: max-line-length
            //     'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189',
            //     [
            //         new Ingredient('meat', 2),
            //         new Ingredient('onion', 4)
            //     ]
            // )
        ];
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChange.next(this.getRecipes());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shopService.addIngredients(ingredients);

    }
    updateRecipe(index: number, recipe: Recipe) {
        console.log("submitted path: "+recipe.imagePath);
        this.recipes[index] = recipe;
        this.recipeChange.next(this.getRecipes());
    }

    addRecipeToLists(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(this.getRecipes());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipeChange.next(this.getRecipes());
    }

}