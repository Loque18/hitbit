import { Component } from '@angular/core';

import { games } from 'src/app/constants/games';

@Component({
    selector: 'homepage-casino-original-games',
    templateUrl: './casino-original-games.component.html',
    styleUrls: ['./casino-original-games.component.scss'],
})
export class CasinoOriginalGamesComponent {
    games = games;
}
