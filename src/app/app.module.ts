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

// *~~*~~*~~ Components ~~*~~*~~* //
import { CarouselComponent } from './components/internal/carousel/carousel.component';
import { TabsComponent } from './components/internal/tabs/tabs.component';
import { TabComponent } from './components/internal/tabs/tab.component';

import { TestComponent } from './pages/test/test.component';

import { LatestBetsComponent } from './components/internal/latest-bets/latest-bets.component';
import { BetsComponent } from './components/internal/bets/bets.component';

import { BetsTabsComponent } from './components/internal/bets-tabs/bets-tabs.component';

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

        // *~~*~~*~~ Test ~~*~~*~~* //
        TestComponent,

        // *~~*~~*~~ Verify email ~~*~~*~~* //
        VerifyEmailComponent,

        // *~~*~~*~~ Components ~~*~~*~~* //
        CarouselComponent,
        TabsComponent,
        TabComponent,

        LatestBetsComponent,
        BetsComponent,

        BetsTabsComponent,
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
    bootstrap: [AppComponent],
})
export class AppModule {}
