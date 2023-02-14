import { Component, OnInit } from '@angular/core';
import { ModalCoreService } from './modal/services/modal-core.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'hitbit';

    constructor(private modalService: ModalCoreService) {}

    ngOnInit() {
        this.modalService.openModal('sign-up');
    }
}
