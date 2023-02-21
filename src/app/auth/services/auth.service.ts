import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, from, lastValueFrom } from 'rxjs';
import { Observable, throwError, catchError } from 'rxjs';

import { LoginRequest, SignupRequest } from 'src/api/requests';

import { ApiResponse, LoginResponse } from 'src/api/responses/response';

import { environment } from 'src/environments/environment';

import { api } from 'src/api';
import { CookieService } from 'src/app/utils/services/cookie.service';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';
import { ProviderType } from 'src/app/utils/services/web3/types';

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
    constructor(
        private http: HttpClient,
        private router: Router,
        private cookieService: CookieService,
        private web3Service: Web3Service
    ) {}

    // *~~*~~*~~ Session data ~~*~~*~~* //
    private _sessionData: SessionData = new SessionData();

    // observable to notify the other modules about the auth state
    private _authState = new BehaviorSubject<boolean>(this._sessionData.isAuthenticated);
    public authState$ = this._authState.asObservable();

    // *~~*~~*~~ Auth events ~~*~~*~~* //

    private onLoginSuccess(token: string): void {
        // create session and serialize it to json
        this._sessionData = new SessionData(true, token);
        const sessionJson = this._sessionData.toJson();

        // store session in cookie
        this.cookieService.setCookie('session', sessionJson, 5);

        // notify new auth state
        this._authState.next(this._sessionData.isAuthenticated);
    }

    private onLogout(): void {
        // create empty session
        this._sessionData = new SessionData();

        // delete session cookie
        this.cookieService.deleteCookie('session');

        // notify new auth state
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

    async loginWithWallet(providerType: ProviderType): Promise<any> {
        // 1. if web3 wallet is not connected, request connection

        if (!this.web3Service.walletData.isLoggedIn)
            await lastValueFrom(this.web3Service.requestConnection(providerType));

        // 2. once wallet is connected fetch web3 nonce
        console.log('wallet data', this.web3Service.walletData);

        const nonceUrl = `${api.url}${api.others.nonce}/?address=${this.web3Service.walletData.address}`;
        const { nonce } = (await lastValueFrom(this.http.get(nonceUrl))) as any;

        // 3. request signtature to the wallet with the nonce
        const message = `HitBit Sign In With Nonce 0`;
        const signature = await lastValueFrom(this.web3Service.signMessage(message));

        // 4. send signature to the server and get the token
        const url = `${api.url}${api.auth.loginWithWallet}/?message=${message}&signature=${signature}`;
        const res = (await lastValueFrom(this.http.post(url, null))) as any;

        // 5. if token is received, store it in cookie and set auth state to true
        if (res.success) {
            const token = res.token as string;
            this.onLoginSuccess(token);
        }

        return res;
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
        this.onLogout();

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
