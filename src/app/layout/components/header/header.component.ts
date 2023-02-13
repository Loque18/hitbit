import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    menuOpen: boolean = false;

    userAuthenticated: boolean = true;

    constructor(private modalService: ModalCoreService, protected authService: AuthService) {}

    // *~~*~~*~~ lifecycle hooks ~~*~~*~~* //
    ngOnInit(): void {
        this.authService.authState$.subscribe((isAuthenticated: boolean) => {
            this.userAuthenticated = isAuthenticated;

            console.log('user authenticated: ', this.userAuthenticated);
        });
    }

    // *~~*~~*~~ header methods ~~*~~*~~* //
    toggleMenuMobile(): void {
        this.menuOpen = !this.menuOpen;
    }

    // *~~*~~*~~ open modals ~~*~~*~~* //

    onLoginClick(): void {
        this.modalService.openModal(AppModals.LOGIN);
    }

    onSignupClick(): void {
        this.modalService.openModal(AppModals.SIGN_UP);
    }

    // *~~*~~*~~ deposit ~~*~~*~~* //
}
