import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'] 
})
export class RecipeItemComponent implements OnInit {

  private videoUrl: SafeUrl = '' ;

  constructor( private sanitizer: DomSanitizer) {

  }

  @Input() recipeItem: Recipe ;
  @Input() index: number;

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.recipeItem.videoPath);
  }

}
