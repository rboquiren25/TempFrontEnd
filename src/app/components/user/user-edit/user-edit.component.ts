import { MD_DIALOG_DATA } from '@angular/material';
import { FormArray, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { User, Role } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit  {
  roleList: string[] = ['Staff', 'Administrator'];
  id: number;
  user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    roles: [],
    scopes: []
  };


  constructor(
    @Inject(MD_DIALOG_DATA)data: any,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.userService.get(this.id).subscribe(user => {
        this.user = user;
    });
  }

  get userJson(){
    return JSON.stringify(this.email);
  }

  get username(){
    return this.user.username;
  }

  get password(){
    return this.user.password;
  }

  get email(){
    return this.user.email;
  }

  get roles(){
    return this.user.roles;
  }

  updateRoles(event: any) {
    if (event.target.checked === true) {
      this.addRole(event);
    }else {
      this.delRole(event) ;
    }
  }

  addRole(event) {
    console.log('add');
    const newRole: Role = {
      'id': 0,
      'roleName': event.target.name
     };
    this.user.roles.push(newRole);
  }

  delRole(event) {
    console.log('delete');
    const delRole: Role = this.user.roles.find(r => r.roleName === event.target.name);
    const i = this.user.roles.indexOf(delRole , 0);
    this.user.roles.splice(i, 1);
  }

  checkRole(role: string) {
     const x = this.user.roles.find(r => r.roleName === role);
     if (x) {
       return true;
     }
    return false;
  }

  OnSubmit() {
    if (this.roles.length > 0 && this.email.trim() !== '') {
      this.userService.update(this.user).subscribe(updtduser => {
        console.log(updtduser);
      });
    }else {
      console.log('invalid request');
    }
  }

}
