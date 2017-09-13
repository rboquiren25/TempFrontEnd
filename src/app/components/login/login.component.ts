import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { User, Role } from './../../models/user';
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
   private route: ActivatedRoute,
   private AuthService: AuthService,
   private ToastyService: ToastyService) { }

  logIn(credential: any) {
    this.AuthService.login(credential)
      .subscribe(result => {
        if (result) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.Router.navigate([returnUrl || '/']);
        }else {
          this.invalidLogin = true;
        }
      });
  }

}

