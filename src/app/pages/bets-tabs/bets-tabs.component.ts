import { Component } from '@angular/core';
import { Ibets , latestBets } from 'src/app/constants/latest-bets';

@Component({
  selector: 'app-bets-tabs',
  templateUrl: './bets-tabs.component.html',
  styleUrls: ['./bets-tabs.component.scss']
})
export class BetsTabsComponent {
links: Ibets[] = latestBets;

 all = document.getElementById('all')
 highest = document.getElementById('highest')
 luckiest = document.getElementById('luckiest')
 
 activateTab() : void {
 this.all?.classList.add('hide')
 } 
}
