import { Injectable } from '@angular/core';
import { ModalModule } from '../modal.module';
import { IAppModal } from 'src/app/constants/modal';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalComponent } from '../components/modal/modal.component';

/**
 * This service is used to handle app modals
 * -   app should be able to pop up a modal
 * -   app should be able to close the curren opened modal
 * -   app should be able to open multiple modals at the same time
 * -   app should be able to go back to the previus modal
 */

@Injectable({
    providedIn: 'root',
})
export class ModalCoreService {
    // variable
    // private glassPanelOpen: boolean = false;

    // array of opened modals, current is -> _modals[_modals.length - 1]
    private _modals: string[] = [];

    // observable to notify the modal component to show/hide
    private _modalSubject: BehaviorSubject<IAppModal> = new BehaviorSubject<IAppModal>({
        id: '',
        show: false,
    });

    public modalSubject$ = this._modalSubject.asObservable();

    // private _modalSubject: BehaviorSubject<IAppModal> = new BehaviorSubject<IAppModal>(null);

    openModal(modalId: string): void {
        this._modalSubject.next({
            id: modalId,
            show: true,
        });
        this._modals.push(modalId);
    }

    closeModal(modalId: string): void {
        this._modalSubject.next({
            id: modalId,
            show: false,
        });
        this._modals = this._modals.filter((id: string) => id !== modalId);
    }

    closeCurrentModal(): void {
        this._modalSubject.next({
            id: this._modals[this._modals.length - 1],
            show: false,
        });

        this._modals.pop();
    }

    closeAllModals(): void {
        this._modals.forEach((modalId: string) => {
            this._modalSubject.next({
                id: modalId,
                show: false,
            });
        });

        this._modals = [];
    }

    goBackToPreviousModal(): void {
        this.closeCurrentModal();
        this.openModal(this._modals[this._modals.length - 1]);
    }
}
