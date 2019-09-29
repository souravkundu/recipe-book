import { Ingredient } from '../shared-recources/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    shoppingListChanged = new Subject<Ingredient[]>();
    editingStarted = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5, '#'),
        new Ingredient('Orange', 3, '#')
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);
        this.shoppingListChanged.next(this.ingredients.slice());
    }
}
