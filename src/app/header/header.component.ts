import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared-recources/data-storage.service';

import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared-recources/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapse = true;
  isAuthenticated: boolean;
  user: User;
  constructor(private dataStorageService: DataStorageService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.user = null;
    this.isAuthenticated = false;
    this.authService.authentication.subscribe(user => {
      this.user = user;
      if (user && user.token) {
        this.isAuthenticated = true;
        this.router.navigateByUrl('/recipes');
      }
      else {
        this.isAuthenticated = false;
        this.router.navigateByUrl('/auth');
      }
    })
  }

  saveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    this.authService.updateUser(null);
    this.router.navigateByUrl('/auth');
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }
}
