// angular modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// extenral libraries
import { BehaviorSubject, lastValueFrom, of } from 'rxjs';
import { Observable, throwError, catchError } from 'rxjs';

// other services
import { CookieService } from 'src/app/utils/services/cookie.service';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';
import { ProviderType } from 'src/app/utils/services/web3/types';

// models
import { LoginRequest, SignupRequest, UserBalanceRequest } from 'src/api/requests';
import { ApiResponse, LoginResponse } from 'src/api/responses/response';
import { UserBalanceResponse } from 'src/api/responses/response';
import { UserData } from 'src/app/shared/models/user/user-data';

// environment
import { environment } from 'src/environments/environment';

// constants
import { api } from 'src/api';

class SessionData {
    constructor(
        public isAuthenticated: boolean = false,
        public token: string | null = null,
        public userData: UserData = {
            username: '',
            balance: [
                {
                    crypto: 'eth',
                    amount: 0,
                },
                {
                    crypto: 'bnb',
                    amount: 0,
                },
                {
                    crypto: 'matic',
                    amount: 0,
                },
            ],
        }
    ) {}

    public toJson(): string {
        return JSON.stringify({
            token: this.token,
        });
    }

    public setUsername(username: string) {
        this.userData = {
            ...this.userData,
            username,
        };
    }

    public setBalance(crypto: 'eth' | 'bnb' | 'matic', amount: number) {
        const bal = {
            crypto,
            amount,
        };

        const balance = this.userData.balance.map(b => {
            if (b.crypto === crypto) {
                return bal;
            }

            return b;
        });

        this.userData = {
            ...this.userData,
            balance,
        };
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

    // *~~*~~*~~ getters ~~*~~*~~* //

    public get session(): SessionData {
        return this._sessionData;
    }

    // *~~*~~*~~ Auth events ~~*~~*~~* //

    private onLoginSuccess(token: string): void {
        // create session and serialize it to json
        this._sessionData = new SessionData(true, token);
        const sessionJson = this._sessionData.toJson();

        // store session in cookie
        this.cookieService.setCookie('session_token', sessionJson, 5);

        this.getUserData({
            verificationToken: token,
        }).subscribe((res: UserBalanceResponse) => {
            if (res.success) {
                this._sessionData.setBalance('eth', res.data?.ETH || 0);
                this._sessionData.setBalance('bnb', res.data?.BNB || 0);
                this._sessionData.setBalance('matic', res.data?.MATIC || 0);
            }

            // notify new auth state
            this._authState.next(this._sessionData.isAuthenticated);
        });
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
        const response = this.http.post(url, null) as Observable<LoginResponse>;

        response.subscribe((res: LoginResponse) => {
            if (res.success) {
                const token = res.data?.verificatonToken as string;

                this.onLoginSuccess(token);
            }
        });

        return response; //.pipe(catchError(this.handleError));

        // return (this.http.post(url, { email, password }) as Observable<ApiResponse>).pipe(catchError(this.handleError));
    }

    async loginWithWallet(providerType: ProviderType): Promise<any> {
        // 1. if web3 wallet is not connected, request connection

        if (!this.web3Service.walletData.isLoggedIn)
            await lastValueFrom(this.web3Service.requestConnection(providerType));

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
            const token = res.data.verificationToken as string;
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

    private getUserData(req: UserBalanceRequest): Observable<UserBalanceResponse> {
        const url = `${api.user.balance}/?verificationToken=${req.verificationToken}`;

        return this.http
            .get<UserBalanceResponse>(url)
            .pipe(catchError(this._handleError<UserBalanceResponse>('getUserData')));
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

    private _handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // log to remote logging infrastructure

            return of(result as T);
        };
    }
}
