import { Component } from '@angular/core';

import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent {
    constructor(private layoutService: LayoutService) {}

    toggleSidebar() {
        this.layoutService.toggleSidebar();
    }

    toggleChat() {
        this.layoutService.toggleChat();
    }
}
