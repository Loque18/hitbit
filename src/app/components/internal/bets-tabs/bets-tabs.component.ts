import { Component } from '@angular/core';
import { Ibets , latestBets } from 'src/app/constants/latest-bets';

@Component({
  selector: 'app-bets-tabs',
  templateUrl: './bets-tabs.component.html',
  styleUrls: ['./bets-tabs.component.scss']
})
export class BetsTabsComponent {

links: Ibets[] = latestBets;
activeTab : string = 'All';
color = document.getElementById("color");

 activateTab(tabs : string) : void{
    this.activeTab = tabs;
    this.color?.classList.add('is-active')
    console.log(this.color)
    console.log('what')
    } 
}
