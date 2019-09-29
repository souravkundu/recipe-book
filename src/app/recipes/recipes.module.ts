import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRouterModule } from './recipes-router.module';
import { SharedModule } from '../shared-recources/shared.module';
import { RecipePreparationComponent } from './recipe-preparation/recipe-preparation.component';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipePreparationComponent
    ],
    imports: [
        SharedModule,
        RecipesRouterModule
    ],
    exports: [
    ]
})
export class RecipesModule { }