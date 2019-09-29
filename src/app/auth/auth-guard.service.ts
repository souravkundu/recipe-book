import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
       return this.authService.authentication.pipe(take(1),map( user => {
            if (user && user.token) {
                return true;
            } else {
               return this.router.createUrlTree(['auth']);
            }
        }));
    }
}