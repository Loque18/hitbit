import { Component, HostListener, OnInit } from '@angular/core';

import { IOnModalClose } from './IOnModalClose';
import { IAppModal } from 'src/app/constants/modal';
import { ModalCoreService } from './services/modal-core.service';

@Component({
    template: '',
})
export abstract class AbstModalComponent implements IAppModal, OnInit {
    abstract id: string;
    show: boolean = false;

    constructor(protected modalService: ModalCoreService) {}

    ngOnInit() {
        this.modalService.modalSubject$.subscribe((modal: IAppModal) => {
            if (this.id === modal.id) {
                if (modal.show) this.open();
                else this.close();
            }
        });
    }

    // *~~*~~*~~*~~*~~* MODAL LOGIC *~~*~~*~~*~~*~~* //
    private open(): void {
        this.show = true;
    }

    private close(): void {
        this.show = false;

        if ('onClose' in this) {
            (this as IOnModalClose).onClose();
        }
    }

    protected closeModal(): void {
        this.modalService.closeModal(this.id);
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.closeModal();
    }
}
