import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

// tslint:disable-next-line: max-line-length
  recipes: Recipe[] = 
  [
    new Recipe('maggi', 'junk food',
   'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189')
   ,
    new Recipe('maggi', 'junk food',
   'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189')
   ,
   new Recipe('maggi', 'junk food',
  'https://www.businessinsider.in/thumb/msid-66635723,width-600,resizemode-4/Now-you-can-trade-10-old-Maggi-wrappers-for-a-new-packet-Nestle-India-launches-pilot-project-to-fight-plastic-menace.jpg?131189')

  ];

  constructor() { }

  ngOnInit() {
  }

}
