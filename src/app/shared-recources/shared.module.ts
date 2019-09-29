import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AddClassOnClickDirective } from '../add-class-on-click.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ActiveItemDirective } from './active-item.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        AddClassOnClickDirective,
        LoadingSpinnerComponent,
        ActiveItemDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownDirective,
        AddClassOnClickDirective,
        LoadingSpinnerComponent,
        ActiveItemDirective
    ]
})
export class SharedModule {

}