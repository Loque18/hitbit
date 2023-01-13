import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { config } from 'src/static/app.config';

import { games, IGame } from 'src/app/constants/games';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    games: IGame[] = games;

    constructor(private titleService: Title) {
        this.titleService.setTitle(`${config.appTitle} · Home`);
    }
}
