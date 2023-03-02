import { Component } from '@angular/core';
import { Ibets, latestBets } from 'src/app/constants/latest-bets';

@Component({
    selector: 'homepage-latest-bets',
    templateUrl: './latest-bets.component.html',
    styleUrls: ['./latest-bets.component.scss'],
})
export class LatestBetsComponent {
    links: Ibets[] = latestBets;

    //const tabs = document.querySelectorAll()
}
