import { Component, OnInit } from '@angular/core';
import { AppModals } from 'src/static/app.modals';
import { ModalCoreService } from './modal/services/modal-core.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'hitbit';

    constructor(private modalService: ModalCoreService) {}

    ngOnInit(): void {
        // disable page scroll

        this.modalService.openModal(AppModals.LOGIN);
    }
}
