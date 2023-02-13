import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(private authService: AuthService, private router: Router) {}

    ensureAuthenticated(): void {
        if (!this.authService.isAuthenticated) this.router.navigateByUrl('/home', { state: { loginModal: true } });
    }
}
