import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  constructor(authService: AuthService, router: Router) {
    super(authService,router);
   }

  canActivate(){
      var isLoggedIn = super.canActivate();
      return isLoggedIn ? this.authService.isInRole('Administrator') : false;
    }
}
