import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/internal/carousel/carousel.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CarouselComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
