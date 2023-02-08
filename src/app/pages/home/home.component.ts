import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { config } from 'src/static/app.config';

import { games, IGame } from 'src/app/constants/games';
import { liveCasinoItems } from 'src/app/constants/live-casino';
import { bonusBattleItems } from 'src/app/constants/bonus-battle';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    games: IGame[] = games;

    lcItems = liveCasinoItems;
    bbItems = bonusBattleItems;

    constructor(private titleService: Title) {
        this.titleService.setTitle($localize`${config.appTitle} · Home`);
    }
}
