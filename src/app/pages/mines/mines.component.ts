import { Component } from '@angular/core';
import { Imines , nums } from 'src/app/constants/mines-numbers';

@Component({
  selector: 'app-mines',
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.scss']
})
export class MinesComponent {
  numbers : Imines[] = nums;
  
}
