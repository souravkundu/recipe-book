import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { HttpClient } from '@angular/common/http';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  id: number;
  recipe: Recipe;
  recipeForm: FormGroup;
  @ViewChild('imageControl') imageControl: FormControl;

  errorMessage: string = null;
  errorOccured = false;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService, private http : HttpClient) { }

  get ingredientControls () {
    return (this.recipeForm.controls.ingredients as FormArray ).controls;
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if (isNaN(this.id)) {
          this.editMode = false;
        } else {
          this.editMode = true;
        }
        this.onInitForm();
      }
    );
  }


  // FORM INITIALIZATION
  onInitForm() {
    let name = '';
    let videoPath = '';
    let imagePath = '';
    let decscription = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeById(this.id);
      name = this.recipe.name;
      videoPath = this.recipe.videoPath;
      imagePath = this.recipe.imagePath;
      decscription = this.recipe.description;
      if (this.recipe.ingredientList) {
        for (let ingredient of this.recipe.ingredientList) {
          ingredients.push(new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount, [Validators.required]),
            unit: new FormControl(ingredient.unit, [Validators.required]),
  
          }));
        }
      }
      
    }
    console.log("Recipe: " + name);
    this.recipeForm = new FormGroup({
      name: new FormControl(name),
      videoPath: new FormControl(videoPath),
      imagePath: new FormControl(imagePath),
      description: new FormControl(decscription),
      ingredients: ingredients
    });

    console.log(this.recipeForm);
  }

  onSubmit() {
    console.log(this.recipeForm);
    const controls = this.recipeForm.controls;
    let youTubeURL = controls.videoPath.value ;
    this.checkVideoURL(youTubeURL);
    if(this.errorOccured) {
      return;
    }
    const videoID = controls.videoPath.value.split('v=')[1];
    
    if(videoID) {
      youTubeURL = 'https://www.youtube.com/embed/'+ videoID;
    }
   
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        new Recipe(
          controls.name.value,
          controls.description.value,
          controls.imagePath.value,
          youTubeURL,
          controls.ingredients.value
        )
      );
    } else {
      this.recipeService.addRecipeToLists( new Recipe(
        controls.name.value,
        controls.description.value,
        controls.imagePath.value,
        youTubeURL,
        controls.ingredients.value
      ));
    }
    this.router.navigateByUrl('');
  }

  onCancel() {
    this.editMode = false;
    this.router.navigateByUrl('');

  }

  deleteIngredient(index: number) {
    //this.recipe.ingredientList = this.recipe.ingredientList.splice(index,1);
    (this.recipeForm.controls.ingredients as FormArray).removeAt(index);
  }

  addIngredient() {
    (this.recipeForm.controls.ingredients as FormArray).push(new FormGroup({
      name: new FormControl('',Validators.required),
      amount: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required)
    }));
  }
  addError() {
    this.errorMessage = 'Image path is incorrect! Please provide correct URL';
  }
  showError() {
    this.errorOccured = true;
  }
  clearError() {
    this.errorMessage = null;
    this.errorOccured = false;
  }

  checkVideoURL(url: string) {
    let videoID1 = url.split('v=')[1];
    let videoID2 = url.split('embed/')[1];

    if (videoID1 || videoID2) {
      this.errorMessage = null;
      this.errorOccured = false;
    } else {
      this.errorMessage = "video not found!";
      this.errorOccured = true;
    }
    
  }

}
