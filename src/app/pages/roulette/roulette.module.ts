import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// *~~*~~*~~ App modules ~~*~~*~~* //
import { RouletteRoutingModule } from './roulette-routing.module';

import { LayoutModule } from 'src/app/layout/layout.module';

// *~~*~~*~~ Components ~~*~~*~~* //

import { RouletteComponent } from './roulette.component';

@NgModule({
    // prettier-ignore
    declarations: [
		RouletteComponent
    ],
    // prettier-ignore
    imports: [
		CommonModule,
		RouletteRoutingModule,
		LayoutModule
    ],
})
export class RouletteModule {}
