import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// *~~*~~*~~ App Modules ~~*~~*~~* //
import { LayoutModule } from 'src/app/layout/layout.module';
import { CasinoGamesRoutingModule } from './casino-games-routing.module';

// // *~~*~~*~~ Components ~~*~~*~~* //
// import { TabsComponent } from 'src/app/components/internal/tabs/tabs.component';
// import { TabComponent } from 'src/app/components/internal/tabs/tab.component';

// *~~*~~*~~ Games module's components ~~*~~*~~* //
import { RouletteComponent } from './roulette/roulette.component';
import { DiceComponent } from './dice/dice.component';
import { MinesComponent } from './mines/mines.component';

@NgModule({
    // prettier-ignore
    declarations: [
        RouletteComponent,
        DiceComponent,
        MinesComponent
    ],

    // prettier-ignore
    imports: [
		CommonModule,
		CasinoGamesRoutingModule,
        ReactiveFormsModule,

        LayoutModule,

   
	],
})
export class CasinoGamesModule {}
