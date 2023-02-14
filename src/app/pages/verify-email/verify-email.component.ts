import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

import { config } from 'src/static/app.config';
import { ApiResponse } from 'src/api/responses/response';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
    verifying: boolean = true;
    verified: boolean = false;
    message: string = '';
    failure_reason: string = '';

    constructor(
        private titleService: Title,
        private _activedRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
        this.titleService.setTitle(`${config.appTitle} · Verify Email`);
    }

    ngOnInit() {
        // get query params
        this.authService

            // send request to verify email
            .verifyEmail({
                email: this._activedRoute.snapshot.queryParams['email'],
                token: this._activedRoute.snapshot.queryParams['token'],
            })

            // handle response
            .subscribe((res: ApiResponse) => {
                this.verifying = false;

                if (res.success) {
                    this.verified = true;
                    this.message = 'Email verified successfully!';

                    setTimeout(() => {
                        // redirect to home page and open login modal
                        this.router.navigateByUrl('/home', { state: { loginModal: true } });
                    }, 3000);
                } else {
                    this.verified = false;
                    this.message = 'Email verification failed';
                    switch (res.statusCode) {
                        case 600:
                            this.failure_reason = 'Email is invalid';
                            break;

                        case 601:
                            this.failure_reason = 'Email is not signed up';
                            break;

                        case 607:
                            this.failure_reason = 'Email is already verified';
                            break;

                        case 608:
                            this.failure_reason = 'Token is invalid';
                            break;

                        default:
                            this.failure_reason = 'Unknown error';
                            break;
                    }
                }
            });
    }
}
