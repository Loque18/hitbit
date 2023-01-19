import { Component, OnInit } from '@angular/core';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';
import { AbstModalComponent } from 'src/app/modal/components/modal/modalComponent';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstModalComponent implements OnInit {
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
}
