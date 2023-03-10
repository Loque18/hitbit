import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagenotfoundRoutingModule } from './pagenotfound-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';

import { PagenotfoundComponent } from './pagenotfound.component';

@NgModule({
    declarations: [PagenotfoundComponent],
    imports: [CommonModule, PagenotfoundRoutingModule, LayoutModule],
})
export class PagenotfoundModule {}
