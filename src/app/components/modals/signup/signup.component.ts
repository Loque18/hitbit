import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';

import { AbstModalComponent } from 'src/app/modal/AbstractModal';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends AbstModalComponent implements OnInit {
    // *~~*~~*~~ injections *~~*~~*~~ //
    constructor(private _modalService: ModalCoreService, private authService: AuthService) {
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

    signup(): void {
        // mark form as submitted
        this.submitted = true;

        if (this.signupForm.invalid) return;

        // mark form as loading
        this.loading = true;

        // log values
        // window.alert(JSON.stringify(this.signupForm.value, null, 4));

        // send http request
        this.authService
            .signUp({
                email: this.sf['email'].value,
                password: this.sf['password'].value,
            })
            .subscribe((res: any) => {
                this.loading = false;
                console.log(res);
            });
    }

    resetForm(): void {
        this.submitted = false;
        this.loading = false;
        this.signupForm.reset();
    }

    get sf(): { [key: string]: AbstractControl } {
        return this.signupForm.controls;
    }
}
