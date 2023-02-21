import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { IOnModalClose } from 'src/app/modal/IOnModalClose';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';

import { AbstModalComponent } from 'src/app/modal/AbstractModal';
import { AppModals } from 'src/static/app.modals';

import { type LoginRequest } from 'src/api/requests';
import { LoginResponse } from 'src/api/responses/response';

import { ProviderType } from 'src/app/utils/services/web3/types';
import { providers } from 'src/app/utils/services/web3/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit, IOnModalClose {
    // *~~*~~*~~ Injections ~~*~~*~~* //
    constructor(
        private _modalService: ModalCoreService,
        private toastr: ToastrService,
        private authService: AuthService,
        private web3Service: Web3Service
    ) {
        super(_modalService);
    }

    // *~~*~~*~~ Modal logic *~~*~~*~~ //
    override id: string = AppModals.LOGIN;

    signUpClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.SIGN_UP);
    }

    onClose(): void {
        this.resetForm();
    }
    // *~~*~~*~~ Login logic *~~*~~*~~ //

    injectedProvider: ProviderType = providers.INJECTED;
    linkedProvider: ProviderType = providers.LINKED;

    loading: boolean = false;
    showPass: boolean = false;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('admin@admin.com', [Validators.required, Validators.email]),
        password: new FormControl('admin123', [Validators.required]),
    });

    submitted: boolean = false;

    toggleShowPass(): void {
        this.showPass = !this.showPass;
    }

    resetForm(): void {
        this.submitted = false;
        this.loginForm.reset();
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    login(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.loginForm.invalid) return;

        // show loading
        this.loading = true;

        const data: LoginRequest = {
            email: this.lf['email'].value,
            password: this.lf['password'].value,
        };

        this.authService
            // send request
            .login(data)

            // handle response
            .subscribe({
                next: (res: LoginResponse) => {
                    this.loading = false;

                    if (res.success) {
                        this.modalService.closeModal(this.id);
                    } else {
                        this._handleErrorCodes(res);
                    }
                },
                error: (err: Error) => {
                    this.loading = false;

                    this.toastr.error(err.message);
                },
            });
    }

    async loginWithWallet(providerType: ProviderType) {
        // show loading
        this.loading = true;

        // handle response
        await this.authService.loginWithWallet(providerType);
    }

    private _handleErrorCodes(res: LoginResponse): void {
        switch (res.statusCode) {
            case 600:
                this.toastr.error('Email is invalid');
                break;

            case 601:
                this.toastr.error('Email is not signed up');
                break;

            case 602:
                this.toastr.error('Email is not verified');
                break;

            case 606:
                this.toastr.error('Invalid email or password');
                break;

            default:
                this.toastr.error('Something went wrong');
                break;
        }
    }
}
