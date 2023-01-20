import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { IOnModalClose } from 'src/app/modal/IOnModalClose';

import { AppModals } from 'src/static/app.modals';
import { AbstModalComponent } from 'src/app/modal/AbstractModal';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit, IOnModalClose {
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

    showPass: boolean = false;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    submitted: boolean = false;

    toggleShowPass(): void {
        this.showPass = !this.showPass;
    }

    login(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.loginForm.invalid) return;

        // log values
        window.alert(JSON.stringify(this.loginForm.value, null, 4));
    }

    resetForm(): void {
        this.submitted = false;
        this.loginForm.reset();
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }
}
