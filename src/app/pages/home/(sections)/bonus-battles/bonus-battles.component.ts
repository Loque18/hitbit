import { Component } from '@angular/core';

import { bonusBattleGames, IBonusBattleGame } from 'src/app/constants/bonus-battle';

@Component({
    selector: 'homepage-bonus-battles',
    templateUrl: './bonus-battles.component.html',
    styleUrls: ['./bonus-battles.component.scss', '../commons.scss'],
})
export class BonusBattlesComponent {
    games: IBonusBattleGame[] = bonusBattleGames;
}
