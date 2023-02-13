import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { AbstModalComponent } from 'src/app/modal/AbstractModal';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';

import { LoginResponse } from 'src/api/responses/login-res';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends AbstModalComponent implements OnInit {
    // *~~*~~*~~ injections *~~*~~*~~ //
    constructor(
        private _modalService: ModalCoreService,
        private authService: AuthService,
        private toastr: ToastrService
    ) {
        super(_modalService);
    }

    // *~~*~~*~~ Modal logic *~~*~~*~~ //
    override id: string = AppModals.SIGN_UP;

    loginClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.LOGIN);
    }

    onClose(): void {
        this.resetForm();
    }

    // *~~*~~*~~ Form logic *~~*~~*~~ //
    loading: boolean = false;
    showPass: boolean = false;

    signupForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        userAgreement: new FormControl(false, [Validators.requiredTrue]),
    });

    submitted: boolean = false;

    toggleShowPass(): void {
        this.showPass = !this.showPass;
    }

    resetForm(): void {
        this.submitted = false;
        this.loading = false;
        this.signupForm.reset();
    }

    get sf(): { [key: string]: AbstractControl } {
        return this.signupForm.controls;
    }

    signup(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.signupForm.invalid) return;

        // mark form as loading
        this.loading = true;

        // log values
        // window.alert(JSON.stringify(this.signupForm.value, null, 4));

        this.authService
            .signUp({
                email: this.sf['email'].value,
                password: this.sf['password'].value,
            })
            .subscribe({
                next: (res: LoginResponse) => {
                    this.loading = false;

                    if (res.success) {
                        this.toastr.success(
                            'You have successfully signed up, please check your email to verify your account'
                        );

                        this.modalService.closeModal(this.id);
                        this.modalService.openModal(AppModals.LOGIN);
                    } else {
                        this._handleErrorCodes(res);
                    }
                },
                error: error => {
                    this.loading = false;

                    this.toastr.error(error.message);
                },
            });
    }

    private _handleErrorCodes(res: LoginResponse): void {
        switch (res.statusCode) {
            case 600:
                this.toastr.error('Email is invalid');
                break;

            case 605:
                this.toastr.error('Email is already registered');
                break;

            default:
                this.toastr.error('Something went wrong, please try again later');
                break;
        }
    }
}
