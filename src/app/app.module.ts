import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


// *~~*~~*~~ Modules ~~*~~*~~* //
import { ModalModule } from './modal/modal.module';
import { LayoutModule } from './layout/layout.module';

// *~~*~~*~~ Modals ~~*~~*~~* //
import { LoginComponent } from './components/modals/login/login.component';
import { SignupComponent } from './components/modals/signup/signup.component';


// *~~*~~*~~ Home page ~~*~~*~~* //
import { HomeComponent } from './pages/home/home.component';

import { CasinoOriginalGamesComponent } from './pages/home/(sections)/casino-original-games/casino-original-games.component';
import { LiveCasinoGamesComponent } from './pages/home/(sections)/live-casino-games/live-casino-games.component';
import { BonusBattlesComponent } from './pages/home/(sections)/bonus-battles/bonus-battles.component';
import { CasinoEventsComponent } from './pages/home/(sections)/casino-events/casino-events.component';


// *~~*~~*~~ 404 ~~*~~*~~* //
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

// *~~*~~*~~ Components ~~*~~*~~* //
import { CarouselComponent } from './components/internal/carousel/carousel.component';


@NgModule({
    declarations: [
        AppComponent,

        // *~~*~~*~~ Modals ~~*~~*~~* //
        LoginComponent,
        SignupComponent,

        // *~~*~~*~~ Home page ~~*~~*~~* //
        HomeComponent,
        
        // home page sections
        CasinoEventsComponent,
        LiveCasinoGamesComponent,
        BonusBattlesComponent,
        CasinoOriginalGamesComponent,

        // *~~*~~*~~ 404 ~~*~~*~~* //
        PagenotfoundComponent,
        

        // *~~*~~*~~ Components ~~*~~*~~* //
        CarouselComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ModalModule,
        LayoutModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
