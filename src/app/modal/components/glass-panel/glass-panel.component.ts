import { Component, OnInit } from '@angular/core';
import { ModalCoreService } from '../../services/modal-core.service';

@Component({
    selector: 'app-modal-glass-panel',
    templateUrl: './glass-panel.component.html',
    styleUrls: ['./glass-panel.component.scss'],
})
export class GlassPanelComponent implements OnInit {
    protected show = false;
    constructor(private modalService: ModalCoreService) {}

    ngOnInit(): void {
        this.modalService.glassPanelSubject$.subscribe((show: boolean) => {
            this.show = show;
        });
    }
}
