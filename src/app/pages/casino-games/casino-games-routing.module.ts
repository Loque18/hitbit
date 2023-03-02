import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiceComponent } from './dice/dice.component';
import { MinesComponent } from './mines/mines.component';
import { RouletteComponent } from './roulette/roulette.component';

const routes: Routes = [
    {
        path: 'dice',
        component: DiceComponent,
    },
    {
        path: 'roulette',
        component: RouletteComponent,
    },
    {
        path: 'mines',
        component: MinesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CasinoGamesRoutingModule {}
