import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './main-layout/main-layout.component';

import { HeaderComponent } from 'src/app/layout/components/header/header.component';
import { FooterComponent } from 'src/app/layout/components/footer/footer.component';
import { SidebarComponent } from 'src/app/layout/components/sidebar/sidebar.component';

@NgModule({
    imports: [CommonModule],
    exports: [MainLayoutComponent],
    declarations: [MainLayoutComponent, HeaderComponent, FooterComponent, SidebarComponent],
})
export class LayoutModule {}