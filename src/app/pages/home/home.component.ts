import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalCoreService } from 'src/app/modal/services/modal-core.service';

import { config } from 'src/static/app.config';
import { AppModals } from 'src/static/app.modals';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private titleService: Title, private router: Router, private modalService: ModalCoreService) {
        this.titleService.setTitle($localize`${config.appTitle} · Home`);

        const navigation = this.router.getCurrentNavigation();

        if (navigation?.extras.state && navigation.extras.state['loginModal']) {
            this.modalService.openModal(AppModals.LOGIN);
        }
    }
}
