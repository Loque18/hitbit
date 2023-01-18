import { Component, OnInit } from '@angular/core';

import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
    selector: 'app-chat-container',
    templateUrl: './chat-container.component.html',
    styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
    collapsed: boolean = false;

    constructor(private layoutService: LayoutService) {}

    ngOnInit(): void {
        this.layoutService.isChatCollapsed$.subscribe((isCollapsed: boolean) => {
            this.collapsed = isCollapsed;
        });
    }

    toggleChat(): void {
        this.layoutService.toggleChat();
    }
}
