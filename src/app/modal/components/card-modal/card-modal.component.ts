import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-modal',
    templateUrl: './card-modal.component.html',
    styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent {
    @Input() id: string = '';
    @Input() show: boolean = false;
    @Input() title: string = '';
}
