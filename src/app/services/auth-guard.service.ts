import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot ) {
    if (this.authService.isLoggedIn()) {
        return true;
    }
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url}});
      return false;
  }
}
