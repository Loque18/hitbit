import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { TestComponent } from './pages/test/test.component';

import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
    // redirect / -> /home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    // auth.verifyEmail
    { path: 'verifyemail', component: VerifyEmailComponent },

    // delete this route
    { path: 'test', component: TestComponent },

    // otherwise redirect to 404
    { path: '**', component: PagenotfoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
