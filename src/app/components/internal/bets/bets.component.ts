import { Component } from '@angular/core';
import { Lbets , leaderBoards } from 'src/app/constants/leaderboards';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent {
  items : Lbets[] = leaderBoards;

}
