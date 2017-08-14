import { ConfirmComponent } from './../../confirm/confirm.component';
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
  constructor(private UserService: UserService, public dialog: MdDialog) { }


  ngOnInit() {
    this.UserService.getAll().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  deleteUser(id: number) {
     this.dialog.open(ConfirmComponent)
      .afterClosed().subscribe(result => {
        console.log(result);
      });
      console.log(id);
  }
}
