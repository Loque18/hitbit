import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { IOnModalClose } from 'src/app/modal/IOnModalClose';

import { AppModals } from 'src/static/app.modals';
import { AbstModalComponent } from 'src/app/modal/AbstractModal';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit, IOnModalClose {
    // *~~*~~*~~ Injections ~~*~~*~~* //
    constructor(private _modalService: ModalCoreService, private authService: AuthService) {
        super(_modalService);
    }

    /* *~~*~~*~~ Modal logic *~~*~~*~~ */
    override id: string = AppModals.LOGIN;

    signUpClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.SIGN_UP);
    }

    onClose(): void {
        this.resetForm();
    }
    /* *~~*~~*~~ Login logic *~~*~~*~~ */

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

    login(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.loginForm.invalid) return;

        // show loading
        this.loading = true;

        const data = {
            email: this.lf['email'].value,
            password: this.lf['password'].value,
        };

        this.authService.login(data);

        this.loading = false;

        // log values
        // window.alert(JSON.stringify(this.loginForm.value, null, 4));
    }

    resetForm(): void {
        this.submitted = false;
        this.loginForm.reset();
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }
}
