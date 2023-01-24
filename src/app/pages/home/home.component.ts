import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { liveCasinoItems } from 'src/app/constants/live-casino';

import { config } from 'src/static/app.config';

import { games, IGame } from 'src/app/constants/games';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    games: IGame[] = games;

    lcItems = liveCasinoItems;

    constructor(private titleService: Title) {
        this.titleService.setTitle($localize`${config.appTitle} · Home`);
    }
}
