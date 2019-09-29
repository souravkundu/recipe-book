import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared-recources/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {

  recipesFound = true;
  recipeLength: number = 0;
  sub: Subscription = null;

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
  //  console.log('on init start comp');
    this.recipeLength = this.recipeService.getRecipes().length;
    if(this.recipeLength === 0){
      this.recipeService.recipeChange.next(null);
      this.fetchRecipes();
    } 
  }

  ngOnDestroy() {
  // console.log('on destroy start comp');
    if(this.sub)
    this.sub.unsubscribe();
  }
  fetchRecipes() {
  // console.log('fetch recipes called');
   this.sub =this.dataStorageService.fetchRecipes().subscribe();
  }
}
