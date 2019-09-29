import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list-service';
import { Ingredient } from 'src/app/shared-recources/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shopService: ShoppingListService) { }
  editMode = false;
  selectedId: number;
  ingredient: Ingredient;


  @ViewChild('f') form : NgForm;

  ngOnInit() {
    this.shopService.editingStarted.subscribe(
      (index: number) => {
        this.selectedId = index;
        this.editMode = true;
        this.ingredient = this.shopService.getIngredient(this.selectedId);
        this.form.setValue(
          {
            name: this.ingredient.name,
            amount: this.ingredient.amount,
            unit: this.ingredient.unit
          }
        );
        
      }
    );
  }

  onSubmit(form: NgForm) {
    
    if(this.editMode)
    {
      this.shopService.updateIngredient(this.selectedId, new Ingredient(form.value.name, form.value.amount, form.value.unit));
    } else {
      this.shopService.addIngredient(new Ingredient(form.value.name, form.value.amount, form.value.unit));
    }
   this.onReset();
  }

  onDelete() {
   this.shopService.deleteIngredient(this.selectedId);
   this.onReset();
  }

  onReset() { 
    this.form.reset();
    this.editMode = false;
  }

}
