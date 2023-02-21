// *~~*~~*~~ Angular ~~*~~*~~* //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// *~~*~~*~~ 3rd party modules ~~*~~*~~* //
import { ToastrModule } from 'ngx-toastr';

// *~~*~~*~~ Root ~~*~~*~~* //
import { AppRoutingModule } from './app-routing.module';
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
import { ProvidersGamesComponent } from './pages/home/(sections)/providers-games/providers-games.component';
import { CasinoEventsComponent } from './pages/home/(sections)/casino-events/casino-events.component';



// *~~*~~*~~ Verify email ~~*~~*~~* //
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';


// *~~*~~*~~ 404 ~~*~~*~~* //
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

// *~~*~~*~~ Components ~~*~~*~~* //
import { CarouselComponent } from './components/internal/carousel/carousel.component';
import { LatestBetsComponent } from './components/internal/latest-bets/latest-bets.component';
import { BetsComponent } from './components/internal/bets/bets.component';
import { RouletteComponent } from './pages/roulette/roulette.component';

@NgModule({
    declarations: [
        AppComponent,

        // *~~*~~*~~ Modals ~~*~~*~~* //
        LoginComponent,
        SignupComponent,

        // *~~*~~*~~ Home page ~~*~~*~~* //
        HomeComponent,
        
        // home page sections
        CasinoOriginalGamesComponent,
        LiveCasinoGamesComponent,
        BonusBattlesComponent,
        ProvidersGamesComponent,
        CasinoEventsComponent,

        // *~~*~~*~~ Verify email ~~*~~*~~* //
        VerifyEmailComponent,

        // *~~*~~*~~ 404 ~~*~~*~~* //
        PagenotfoundComponent,
        

        // *~~*~~*~~ Components ~~*~~*~~* //
        CarouselComponent,
        LatestBetsComponent,
        BetsComponent,
        RouletteComponent
                    
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        ModalModule,
        LayoutModule,

        ToastrModule.forRoot(),
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
