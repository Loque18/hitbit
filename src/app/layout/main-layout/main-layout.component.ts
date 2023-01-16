import { Component, OnInit } from '@angular/core';

import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
    sidebarCollapsed: boolean = false;
    chatCollapsed: boolean = false;

    constructor(private layoutService: LayoutService) {}

    ngOnInit(): void {
        // subscribe to sidebar toggle changes
        this.layoutService.isSidebarCollapsed$.subscribe((isCollapsed: boolean) => {
            this.sidebarCollapsed = isCollapsed;
        });

        this.layoutService.isChatCollapsed$.subscribe((isCollapsed: boolean) => {
            this.chatCollapsed = isCollapsed;
        });
    }
}
