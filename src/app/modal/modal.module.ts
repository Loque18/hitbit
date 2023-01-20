import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GlassPanelComponent } from './components/glass-panel/glass-panel.component';
import { BasicModalComponent } from './components/basic-modal/basic-modal.component';
import { CardModalComponent } from './components/card-modal/card-modal.component';

@NgModule({
  declarations: [
    GlassPanelComponent,
    BasicModalComponent,
    CardModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GlassPanelComponent,
    BasicModalComponent,
    CardModalComponent
  ]
})
export class ModalModule { }
