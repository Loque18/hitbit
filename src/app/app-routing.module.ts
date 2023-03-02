import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *~~*~~*~~ Home ~~*~~*~~* //
import { HomeComponent } from 'src/app/pages/home/home.component';

// *~~*~~*~~ Auth ~~*~~*~~* //
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

// *~~*~~*~~ Casino original games ~~*~~*~~* //
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
    // redirect / -> /home
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
    },

    // auth.verifyEmail
    { path: 'verifyemail', component: VerifyEmailComponent },

    // delete this route
    // { path: 'test', component: TestComponent },

    // *~~*~~*~~ Casino original games ~~*~~*~~* //
    {
        path: 'games',
        loadChildren: () => import('src/app/pages/casino-games/casino-games.module').then(m => m.CasinoGamesModule),
    },

    // *~~*~~*~~ States ~~*~~*~~* //

    // 404
    {
        path: '**',
        loadChildren: () => import('src/app/pages/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
