import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { SharedModule } from '../shared-recources/shared.module';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        ShoppingListRouterModule,
        NgxPrintModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
        NgxPrintModule
    ]
})
export class ShoppingListModule {

}