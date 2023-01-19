import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';

import { GlassPanelComponent } from './components/glass-panel/glass-panel.component';

@NgModule({
  declarations: [
    ModalComponent,
    GlassPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    GlassPanelComponent
  ]
})
export class ModalModule { }
