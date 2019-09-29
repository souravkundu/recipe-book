import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../shared-recources/user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    authentication = new BehaviorSubject<User>(null);

    user: User = null;

    private loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

    private signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signUpURL, {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap(response => {
            this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }));
    }

    authenticate(email: string, password: string) {

        return this.http.post<AuthResponseData>(this.loginURL, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => {
            this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }));

    }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'an unknown error occured';
        // console.log(errorRes);
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        let message = errorRes.error.error.message;
        switch (message) {
            case 'WEAK_PASSWORD : Password should be at least 6 characters': errorMessage = message.split(' : ')[1]; break;
            case 'EMAIL_EXISTS': errorMessage = 'Email already registered!'; break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'No account exists with this email id. Try registered email.'; break;
            case 'INVALID_PASSWORD': errorMessage = 'The password is invalid or the user does not have a password.'; break;
        }
        //console.log(message.split(' : ')[0]);
        return throwError(errorMessage);
    }

    handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        this.updateUser(new User(email, userId, token, new Date(new Date().getTime() + expiresIn * 1000)));
        this.autoLogout( expiresIn * 1000);
    }

    updateUser(user: User) {
        this.user = user;
        localStorage.setItem('userData',JSON.stringify(this.user));
      //  console.log(JSON.stringify(this.user));
        this.authentication.next(this.user);
    }

    autoLogin() {
        const userData: { email: string, userid: string, $token: string, $tokenExpirationDate: string } 
            = JSON.parse(localStorage.getItem('userData'));

           // console.log( userData.email+ ' \n ' + userData.$tokenExpirationDate + ' \n ' + userData.userid);

            if(userData && new Date(userData.$tokenExpirationDate) > new Date()) {
                this.autoLogout(new Date(userData.$tokenExpirationDate).getTime()  - new Date().getTime());
            }
           
        if (userData) {
            this.updateUser(new User(userData.email,userData.userid,userData.$token, new Date(userData.$tokenExpirationDate)));
        }
    }

    autoLogout(time: number) {
       // console.log(time);
        setTimeout(() => {
            this.updateUser(null);
        },time);
    }
}