import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './modal/modal.module';
import { LayoutModule } from './layout/layout.module';




import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/internal/carousel/carousel.component';
import { LoginComponent } from './components/modals/login/login.component';
import { SignupComponent } from './components/modals/signup/signup.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CarouselComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ModalModule,
        LayoutModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
