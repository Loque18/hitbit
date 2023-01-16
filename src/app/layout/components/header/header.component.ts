import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    menuOpen: boolean = false;

    toggleMenuMobile(): void {
        this.menuOpen = !this.menuOpen;
    }
}
