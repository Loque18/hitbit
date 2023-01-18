import { Component, OnInit } from '@angular/core';
import { AbstModalComponent } from 'src/app/modal/components/modal/modalComponent';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends AbstModalComponent implements OnInit {
    override id: string = AppModals.SIGN_UP;

    constructor(modalService: ModalCoreService) {
        super(modalService);
    }

    ngOnInit(): void {
        super.onInit();
    }
}
