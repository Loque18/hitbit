import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';
import { AbstModalComponent } from 'src/app/modal/components/modal/modalComponent';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit {
    constructor(modalService: ModalCoreService) {
        super(modalService);
    }

    /* *~~*~~*~~ Modal logic *~~*~~*~~ */

    override id: string = AppModals.LOGIN;

    ngOnInit(): void {
        super.onInit();
    }

    signUpClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.SIGN_UP);
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

    get lf(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }
}
