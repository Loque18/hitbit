import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal.module';
import { LayoutModule } from './layout/layout.module';




import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

import { CasinoEventsComponent } from './pages/home/(sections)/casino-events/casino-events.component';

import { CarouselComponent } from './components/internal/carousel/carousel.component';
import { LoginComponent } from './components/modals/login/login.component';
import { SignupComponent } from './components/modals/signup/signup.component';

@NgModule({
    declarations: [
        AppComponent,

        // home page
        HomeComponent,
        
        // home page sections
        CasinoEventsComponent,
        
        // home page sections
        // EventsCardComponent,

        PagenotfoundComponent,
        
        CarouselComponent,
        LoginComponent,
        SignupComponent,
        PagenotfoundComponent,
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
