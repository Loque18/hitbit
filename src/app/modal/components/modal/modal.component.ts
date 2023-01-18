import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
    @Input() id: string = '';
    @Input() show: boolean = false;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    closeClick(): void {
        this.onClose.emit();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent): void {
        if (this.show) this.onClose.emit();
    }
}
