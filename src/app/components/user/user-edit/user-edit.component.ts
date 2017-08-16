import { MD_DIALOG_DATA } from '@angular/material';
import { FormArray, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { user, role } from './../../../models/user';
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
  user: user = {
    id: 0,
    username: '',
    password: '',
    email: '',
    roles: []
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
        console.log(user);
    });
    console.log(this.id);
  }

  get userJson(){
    return JSON.stringify(this.user);
  }

}
