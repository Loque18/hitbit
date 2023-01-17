import { Component, OnInit } from '@angular/core';

import { INavLink, NAV_LINKS } from 'src/app/constants/navigation';

import { LayoutService } from '../../services/layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss', './sidebar-bg.component.scss'],
})
export class SidebarComponent implements OnInit {
    topLinks: INavLink[] = NAV_LINKS.slice(0, 7);
    bottomLinks: INavLink[] = NAV_LINKS.slice(7);

    collapsed: boolean = false;

    readonly arrowLeftIcon = '/assets/icons/arrow-left.svg';
    readonly arrowRightIcon = '/assets/icons/arrow-right.svg';

    constructor(private LayoutService: LayoutService) {}

    ngOnInit(): void {
        // subscribe to sidebar toggle changes
        this.LayoutService.isSidebarCollapsed$.subscribe((isCollapsed: boolean) => {
            this.collapsed = isCollapsed;
        });
    }

    toggleSidebar() {
        this.LayoutService.toggleSidebar();
    }
}
