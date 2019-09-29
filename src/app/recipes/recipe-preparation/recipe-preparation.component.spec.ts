import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePreparationComponent } from './recipe-preparation.component';

describe('RecipePreparationComponent', () => {
  let component: RecipePreparationComponent;
  let fixture: ComponentFixture<RecipePreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
