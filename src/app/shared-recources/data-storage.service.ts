import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';
import { tap, take } from 'rxjs/operators';
import { AuthenticationService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthenticationService) { }


    saveRecipes() {
        const recipes = this.recipeService.getRecipes();
        let userEmail: string = null;
        this.authService.authentication.pipe(take(1)).subscribe( user => {
            userEmail = user.email.split('.')[0];
        });
        this.http.put<Recipe[]>('https://recipe-book-project-102.firebaseio.com/recipes.json', recipes).subscribe((response) => {
            console.log(response);
        });
    }

    fetchRecipes() {
       // console.log('ds service fetch recipse called');
        return this.http.get<Recipe[]>('https://recipe-book-project-102.firebaseio.com/recipes.json', {
            observe: 'body',
        }).pipe(
            tap(recipes => {
                  //  console.log('inside tap operator of fetch recipes' + recipes);
                    this.recipeService.setRecipes(recipes);
                }
            ));
    }
}