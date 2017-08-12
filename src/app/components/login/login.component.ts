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
    private AuthService: AuthService) { }

  logIn(credential: any) {
    this.AuthService.login(credential)
      .subscribe(result => {
        if (result) {
          console.log(result);
          
        }else {
          this.invalidLogin = true;
          console.log(this.invalidLogin);
        }
      });
  }

}

