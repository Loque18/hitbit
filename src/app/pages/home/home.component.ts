import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { config } from 'src/static/app.config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private titleService: Title) {
        this.titleService.setTitle($localize`${config.appTitle} · Home`);
    }
}
