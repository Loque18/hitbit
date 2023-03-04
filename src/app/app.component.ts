import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { WebsocketsService } from './shared/services/websockets/websockets.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'hitbit';

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // this.modalService.openModal('sign-up');

        // try restoring session if any
        this.authService.restoreSession();
    }
}
