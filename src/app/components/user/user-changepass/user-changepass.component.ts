import { ToastyService } from 'ng2-toasty';
import { element } from 'protractor';
import { UserService } from './../../../services/user.service';
import { ChangePass } from './../../../models/changepass';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { User, KeyValuePair } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-changepass',
  templateUrl: './user-changepass.component.html',
  styleUrls: ['./user-changepass.component.css']
})
export class UserChangepassComponent implements OnInit {
  changepass: ChangePass = {
    username: '',
    oldpassword: '',
    newpassword: '',
    confirmpassword: ''
  };

  constructor(private authservice: AuthService, private userService: UserService, private ToastyService: ToastyService, private router: Router) { }

  ngOnInit() {
    this.changepass.username = this.authservice.userName;
    console.log(JSON.stringify(this.changepass));
  }

  OnSubmit() {
    this.userService.changePassword(this.changepass).subscribe( result => {
      if (result) {
        this.ToastyService.success({
          title: 'Success!',
          msg: 'Password changed',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
        this.authservice.logout();
        this.router.navigate(['/user/login']);
      } else {
        this.ToastyService.error({
          title: 'Error!',
          msg: 'Invalid password',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      }

    });
  }

  get validate(){
    if ((this.emailEqual && this.changepass.oldpassword) &&  this.changepass.oldpassword.length >= 8 ) {
      return true;
    }
    return null;
  }

  get emailEqual() {
    if (this.changepass.newpassword === this.changepass.confirmpassword
    && this.changepass.newpassword.length >= 8 && this.changepass.confirmpassword.length >= 8 ) {
      return true;
    }
    return null;
  }
}
