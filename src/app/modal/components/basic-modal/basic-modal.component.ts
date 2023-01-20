import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-basic-modal',
    templateUrl: './basic-modal.component.html',
    styleUrls: ['./basic-modal.component.scss'],
})
export class BasicModalComponent {
    @Input() id: string = '';
    @Input() show: boolean = false;
    @Input() modalContentClasses: string = '';
}
