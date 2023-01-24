import { Component } from '@angular/core';

import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { AppModals } from 'src/static/app.modals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    menuOpen: boolean = false;

    constructor(private modalService: ModalCoreService) {}

    toggleMenuMobile(): void {
        this.menuOpen = !this.menuOpen;
    }

    onLoginClick(): void {
        this.modalService.openModal(AppModals.LOGIN);
    }

    onSignupClick(): void {
        this.modalService.openModal(AppModals.SIGN_UP);
    }

    onLanguageChange(language: string): void {
        window.location.href = `/${language}`;
    }
}
