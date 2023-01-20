import { Injectable, OnInit } from '@angular/core';
import { IAppModal } from 'src/app/constants/modal';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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

    // array of opened modals, current is -> _modals[_modals.length - 1]
    private _modals: string[] = [];

    // observable to notify the modal component to show/hide
    private _modalSubject: BehaviorSubject<IAppModal> = new BehaviorSubject<IAppModal>({
        id: '',
        show: false,
    });

    // observable to notify if glass panel should be shown
    private _glassPanelSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public modalSubject$ = this._modalSubject.asObservable();
    public glassPanelSubject$ = this._glassPanelSubject.asObservable();

    constructor() {
        this.modalSubject$.subscribe((modal: IAppModal) => {
            if (this._modals.length > 0) {
                // open glass panel
                this._glassPanelSubject.next(true);

                // deactivate scroll on page
                document.documentElement.style.overflow = 'hidden';
            } else {
                // close glass panel
                this._glassPanelSubject.next(false);

                // activate scroll on page
                document.documentElement.style.overflow = 'auto';
            }
        });
    }

    openModal(modalId: string): void {
        this._modals.push(modalId);

        this._modalSubject.next({
            id: modalId,
            show: true,
        });
    }

    closeModal(modalId: string): void {
        this._modals = this._modals.filter((id: string) => id !== modalId);

        this._modalSubject.next({
            id: modalId,
            show: false,
        });
    }

    closeCurrentModal(): void {
        if (this._modals.length === 0) return;

        // remove last modal from array
        const modalId: string = this._modals.pop() as string;

        this._modalSubject.next({
            id: modalId,
            show: false,
        });
    }

    closeAllModals(): void {
        const m = this._modals;
        this._modals = [];

        m.forEach((modalId: string) => {
            this._modalSubject.next({
                id: modalId,
                show: false,
            });
        });
    }

    goBackToPreviousModal(): void {
        this.closeCurrentModal();
        this.openModal(this._modals[this._modals.length - 1]);
    }
}
