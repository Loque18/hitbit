import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { Observable, throwError, catchError } from 'rxjs';

import { LoginRequest, SignupRequest } from 'src/api/requests';

import { ApiResponse, LoginResponse } from 'src/api/responses/response';

import { environment } from 'src/environments/environment';

import { api } from 'src/api';
import { CookieService } from 'src/app/utils/services/cookie.service';

class SessionData {
    constructor(public isAuthenticated: boolean = false, public token: string | null = null) {}

    public toJson(): string {
        return JSON.stringify({
            token: this.token,
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

    // *~~*~~*~~ Session data ~~*~~*~~* //
    private _sessionData: SessionData = new SessionData();

    // observable to notify the other modules about the auth state
    private _authState = new BehaviorSubject<boolean>(this._sessionData.isAuthenticated);
    public authState$ = this._authState.asObservable();

    // *~~*~~*~~ Auth events ~~*~~*~~* //

    private onLoginSuccess(token: string): void {
        this._sessionData = new SessionData(true, token);

        const sessionJson = this._sessionData.toJson();

        this.cookieService.setCookie('session', sessionJson, 5);

        this._authState.next(this._sessionData.isAuthenticated);
    }

    // *~~*~~*~~ Http requests ~~*~~*~~* //
    signUp(params: SignupRequest): Observable<ApiResponse> | Observable<never> {
        const { email, password } = params;

        const url = `${api.url}${api.auth.signup}/?email=${email}&pass=${password}`;

        return (this.http.post(url, null) as Observable<ApiResponse>).pipe(catchError(this.handleError));
    }

    login(data: LoginRequest): Observable<LoginResponse> | Observable<never> {
        const { email, password } = data;
        const url = `${api.url}${api.auth.login}/?email=${email}&pass=${password}`;

        // process response data before returning it, store token in cookie and set auth state to true
        const response = this.http.post(url, { email, password }) as Observable<LoginResponse>;

        response.subscribe((res: LoginResponse) => {
            if (res.success) {
                const token = res.token as string;
                this.onLoginSuccess(token);
            }
        });

        return response.pipe(catchError(this.handleError));

        // return (this.http.post(url, { email, password }) as Observable<ApiResponse>).pipe(catchError(this.handleError));
    }

    restoreSession(): boolean {
        const sessionJson = this.cookieService.getCookie('session');

        if (sessionJson) {
            const sessionData = JSON.parse(sessionJson);

            this._sessionData = new SessionData(true, sessionData.token);

            this._authState.next(this._sessionData.isAuthenticated);

            return true;
        }

        return false;
    }

    verifyEmail(params: any): Observable<ApiResponse> {
        const { email, token } = params;

        const url = `${api.url}${api.auth.verifyEmail}/?email=${email}&verificationToken=${token}`;

        return this.http.post(url, null) as Observable<ApiResponse>;
    }

    logout(): void {
        this._sessionData = new SessionData(false, null);

        this.cookieService.deleteCookie('session');

        this._authState.next(this._sessionData.isAuthenticated);

        this.router.navigate(['/']);

        // this.router.navigate(['/'], { queryParams: { logout: true } });
    }

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
