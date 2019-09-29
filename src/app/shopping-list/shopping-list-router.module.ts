import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';


const shoppingList: Routes = [
    { path: '', component: ShoppingListComponent},
];

@NgModule({
    imports: [RouterModule.forChild(shoppingList)],
    exports: [RouterModule]
})
export class ShoppingListRouterModule {}