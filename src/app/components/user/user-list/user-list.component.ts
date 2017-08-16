import { UserEditComponent } from './../user-edit/user-edit.component';
import { user } from './../../../models/user';
import { Router } from '@angular/router';
import { UserCreateComponent } from './../user-create/user-create.component';
import { SuccessComponent } from './../../dialogs/success/success.component';
import { ConfirmComponent } from './../../dialogs/confirm/confirm.component';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users;
  constructor(private UserService: UserService, public dialog: MdDialog, private router: Router) { }


  ngOnInit() {
    this.UserService.getAll().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  deleteUser(id: number) {
     this.dialog.open(ConfirmComponent)
      .afterClosed().subscribe(result => {
        if (result) {
            this.UserService.delete(id).subscribe(resultDel => {
              if (resultDel) {
                console.log('delete success');
                this.dialog.open(SuccessComponent, {
                  data: {msg: 'User has been successfully deleted'}
                });
                this.UserService.getAll().subscribe(users => {
                  this.users = users;
                });
              } else {
                console.log('bad request');
              }
            });
        }
      });
  }

  createUser() {
    this.dialog.open(UserCreateComponent, {
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(result => {
        this.UserService.getAll().subscribe(users => {
          this.users = users;
        });
      });
  }

  editUser(id: number) {
    this.dialog.open(UserEditComponent, {
      data: {id: id},
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(result => {
        this.UserService.getAll().subscribe(users => {
          this.users = users;
        });
      });
  }

}
