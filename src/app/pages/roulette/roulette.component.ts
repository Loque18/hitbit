import { Component } from '@angular/core';
import { Iroulette , image } from 'src/app/constants/roulette-game';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss']
})
export class RouletteComponent {
 images : Iroulette[] = image;

consoleLog():void{
  console.log("It works")
}

}
