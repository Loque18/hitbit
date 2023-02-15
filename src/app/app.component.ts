import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { ModalCoreService } from './modal/services/modal-core.service';
import { Web3Service } from './utils/services/web3/web3.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'hitbit';

    constructor(
        private modalService: ModalCoreService,
        private authService: AuthService,
        private web3Service: Web3Service
    ) {}

    ngOnInit() {
        // this.modalService.openModal('sign-up');

        // try restoring session if any
        this.authService.restoreSession();
    }
}
