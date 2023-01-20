import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';
import { AbstModalComponent } from 'src/app/modal/components/modal/modalComponent';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit {
    /* *~~*~~*~~ Modal logic *~~*~~*~~ */

    override id: string = AppModals.LOGIN;

    constructor(modalService: ModalCoreService) {
        super(modalService);
    }

    ngOnInit(): void {
        super.onInit();
    }

    signUpClick(): void {
        this.modalService.closeModal(this.id);
        this.modalService.openModal(AppModals.SIGN_UP);
    }

    /* *~~*~~*~~ Login logic *~~*~~*~~ */

    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });

    login(): void {
        // log values
        console.log(this.loginForm.value);

        // log status
        console.log(this.loginForm.status);

        // log errors
        console.log(this.loginForm);
    }
    // onChanges(): void {
    //     this.loginForm.valueChanges.subscribe(val => {
    //         console.log(val);
    //     });
    // }
}
