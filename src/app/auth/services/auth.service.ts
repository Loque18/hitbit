import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { map, Observable, switchMap, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

import { environment } from 'src/environments/environment';

interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private _isAuthenticated = false;

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    // *~~*~~*~~ METHODS ~~*~~*~~* //
    signUp(params: any): any {
        const { email, password } = params;

        const url = `${environment.apiUrl}/signup/?email=${email}&pass=${password}`;

        return this.http.post(url, {}).pipe(catchError(this.handleError));
    }

    async login(params: any) {
        const { email, password } = params;

        const data = {
            email,
            password,
        };

        const url = `${environment.apiUrl}/sanctum/csrf-cookie`;

        const options = {
            headers: new HttpHeaders({
                Accept: 'application/json',
            }),
            withCredentials: true,
        };

        this.http.get(url, options).subscribe(res => {
            console.log('csrf-cookie', res);

            const url = `${environment.apiUrl}/login`;

            this.http.post(url, data, options).subscribe(res2 => {
                console.log('login', res2);
            });
        });
        // const res = await this.http
        //     .post<any>(`${environment.apiUrl}/login`, data, { withCredentials: true })
        //     .toPromise();

        // console.log(res);

        // return this.getCSRFToken().pipe(
        //     switchMap(() => {
        //         return this.http
        //             .post<LoginResponse>(url, data, {
        //                 withCredentials: true,
        //             })
        //             .pipe(catchError(this.handleError));
        //     })
        // );
    }

    private getCSRFToken(): Observable<void> {
        const url = `${environment.apiUrl}/sanctum/csrf-cookie`;

        return this.http
            .get(url, {
                withCredentials: true,
            })
            .pipe(
                retry(2),
                catchError(this.handleError),
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                map(() => {})
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }

        // return an observable with a user-facing error message
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
