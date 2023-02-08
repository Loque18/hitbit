import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { config } from 'src/static/app.config';

@Component({
    selector: 'app-pagenotfound',
    templateUrl: './pagenotfound.component.html',
    styleUrls: ['./pagenotfound.component.scss'],
})
export class PagenotfoundComponent {
    constructor(private titleService: Title) {
        this.titleService.setTitle(`${config.appTitle} · 404 - Page Not Found`);
    }
}
