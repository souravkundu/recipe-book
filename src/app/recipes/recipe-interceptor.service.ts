import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class RecipeInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
       return this.authService.authentication.pipe(take(1),exhaustMap( user => {
            if(user && user.token) {
                const modifiedReq = request.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            }
            return next.handle(request);
        }));
    }
}