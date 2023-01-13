import { Component } from '@angular/core';

import { INavLink, NAV_LINKS } from 'src/app/constants/navigation';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    topLinks: INavLink[] = NAV_LINKS.slice(0, 7);
    bottomLinks: INavLink[] = NAV_LINKS.slice(7);

    collapsed: boolean = localStorage.getItem('sidebarCollapsed') === 'true';

    toggleCollapsed(): void {
        this.collapsed = !this.collapsed;
        localStorage.setItem('sidebarCollapsed', this.collapsed.toString());
    }
}
