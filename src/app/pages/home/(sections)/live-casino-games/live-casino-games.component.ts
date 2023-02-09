import { Component } from '@angular/core';

import { liveCasinoGames, ILiveCasinoGame } from 'src/app/constants/live-casino';

@Component({
    selector: 'homepage-live-casino-games',
    templateUrl: './live-casino-games.component.html',
    styleUrls: ['./live-casino-games.component.scss'],
})
export class LiveCasinoGamesComponent {
    games: ILiveCasinoGame[] = liveCasinoGames;
}
