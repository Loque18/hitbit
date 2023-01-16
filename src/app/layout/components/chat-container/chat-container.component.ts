import { Component } from '@angular/core';

@Component({
    selector: 'app-chat-container',
    templateUrl: './chat-container.component.html',
    styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
    collapsed: boolean = false; // localStorage.getItem('ChatContainerCollapsed') === 'true';

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;

        localStorage.setItem('ChatContainerCollapsed', this.collapsed.toString());
    }
}
