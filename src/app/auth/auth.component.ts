import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { NgForm, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signInMode = true;
  errorMessage = null;
  validity = true;
  loading = false;

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSwitch() {
    this.signInMode = !this.signInMode;
    this.form.reset();
    this.errorMessage = null;
    this.validity = true;
  }

  onSubmit(form: NgForm) {
    const creds = form.value;
    this.loading = true;
    this.checkValidity(form);
    if (!this.signInMode) {
      this.authService.signUp(creds.email, creds.password).subscribe(response => {
        this.loading = false;
       // this.router.navigateByUrl('/recipes');
      }, error => {
        this.loading = false;
        this.errorMessage = error;
        this.validity = false;
      });
    } else {
      this.authService.authenticate(creds.email, creds.password).subscribe(response => {
      //  this.router.navigateByUrl('/recipes');
      this.loading = false;
      }, error => {
        this.loading = false;
        this.errorMessage = error;
        this.validity = false;
      });
    }
  }

  checkValidity(form: NgForm) {
    if (!this.signInMode && form.value.password !== form.value.confirmPassword) {
      this.validity = false;
      this.errorMessage = 'Password do not match! Try again.';
    }
    else {
      this.validity = true;
      this.errorMessage = null;
    }
  }

}
