import { Ingredient } from '../shared-recources/ingredient.model';

export class Recipe {
    name: string;
    description: string;
    videoPath: string;
    imagePath: string;
    ingredientList: Ingredient[];

    constructor(name: string, desc: string, imagePath: string, videoPath: string, ingredients: Ingredient[]){

        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.videoPath = videoPath;
        this.ingredientList = ingredients;

    }
}