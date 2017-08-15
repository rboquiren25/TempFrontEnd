import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { user, role } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormArray} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(
   private Router: Router,
   private AuthService: AuthService,
   private ToastyService: ToastyService) { }

  logIn(credential: any) {
    this.AuthService.login(credential)
      .subscribe(result => {
        if (result) {
          this.Router.navigate(['/']);
        }else {
          this.invalidLogin = true;
        }
      });
  }

}

