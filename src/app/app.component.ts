import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { ModalCoreService } from './modal/services/modal-core.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'hitbit';

    constructor(private modalService: ModalCoreService, private authService: AuthService) {}

    ngOnInit() {
        // this.modalService.openModal('sign-up');

        // try restoring session if any
        this.authService.restoreSession();
    }
}
