import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject } from 'rxjs';
import { Observable, throwError, catchError, switchMap } from 'rxjs';

import { LoginResponse } from 'src/api/responses/login-res';
import { VerifyEmailResponse } from 'src/api/responses/verify-email-res';

import { environment } from 'src/environments/environment';

import { api } from 'src/api';
import { CookieService } from 'src/app/utils/services/cookie.service';

interface SessionData {
    isAuthenticated: boolean;
    token: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private toastr: ToastrService, private cookieService: CookieService) {}

    // *~~*~~*~~ Session data ~~*~~*~~* //
    private _sessionData: SessionData = {
        isAuthenticated: false,
        token: null,
    };

    private _authState = new BehaviorSubject<boolean>(this._sessionData.isAuthenticated);
    public authState$ = this._authState.asObservable();

    public set_token(token: string) {
        this._sessionData = {
            ...this._sessionData,
            token,
        };

        this.cookieService.setCookie('0x786a7sd', token, 1); // token
    }

    public set_auth(isAuthenticated: boolean) {
        this._sessionData = {
            ...this._sessionData,
            isAuthenticated,
        };

        this._authState.next(isAuthenticated);
    }

    get token() {
        return this._sessionData.token;
    }

    // *~~*~~*~~ METHODS ~~*~~*~~* //
    signUp(params: any): Observable<LoginResponse> | Observable<never> {
        const { email, password } = params;

        const url = `${api.url}${api.auth.signup}/?email=${email}&pass=${password}`;

        return (this.http.post(url, null) as Observable<LoginResponse>).pipe(catchError(this.handleError));
    }

    login(params: { email: string; password: string }): Observable<LoginResponse> | Observable<never> {
        const { email, password } = params;
        const url = `${api.url}${api.auth.login}/?email=${email}&pass=${password}`;

        return (this.http.post(url, { email, password }) as Observable<LoginResponse>).pipe(
            catchError(this.handleError)
        );
    }

    verifyEmail(params: any): Observable<VerifyEmailResponse> {
        const { email, token } = params;

        const url = `${api.url}${api.auth.verifyEmail}/?email=${email}&verificationToken=${token}`;

        return this.http.post(url, null) as Observable<VerifyEmailResponse>;
    }

    // private getCSRFToken(): Observable<any> {
    //     const url = `${environment.apiUrl}/sanctum/csrf-cookie`;

    //     return this.http.get(url).pipe(
    //         retry(2),
    //         catchError(this.handleError)
    //         // eslint-disable-next-line @typescript-eslint/no-empty-function
    //     );
    // }

    private handleError(error: HttpErrorResponse) {
        if (!environment.production) {
            console.error('Auth service error: ', error);
        }

        let errorMessage = '';

        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error);
            errorMessage = 'An error occurred. Please try again later.';
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
            errorMessage = 'We are not capable of handling your request at this time. Please try again later.';
        }

        // return an observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
    }
}
