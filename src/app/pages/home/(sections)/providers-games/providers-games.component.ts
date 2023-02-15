import { Component } from '@angular/core';

import { ProvidersGame, providersGames } from 'src/app/constants/providers-games';

@Component({
    selector: 'homepage-providers-games',
    templateUrl: './providers-games.component.html',
    styleUrls: ['./providers-games.component.scss'],
})
export class ProvidersGamesComponent {
    games: ProvidersGame[] = providersGames;
}
