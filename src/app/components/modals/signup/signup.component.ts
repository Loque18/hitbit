import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { AbstModalComponent } from 'src/app/modal/AbstractModal';

import { AppModals } from 'src/static/app.modals';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends AbstModalComponent implements OnInit {
    /* *~~*~~*~~ Modal logic *~~*~~*~~ */
    override id: string = AppModals.SIGN_UP;

    loginClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.LOGIN);
    }

    onClose(): void {
        this.resetForm();
    }

    /* *~~*~~*~~ Form logic *~~*~~*~~ */
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

    signup(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.signupForm.invalid) return;

        // log values
        window.alert(JSON.stringify(this.signupForm.value, null, 4));
    }

    resetForm(): void {
        this.submitted = false;
        this.signupForm.reset();
    }

    get sf(): { [key: string]: AbstractControl } {
        return this.signupForm.controls;
    }
}
