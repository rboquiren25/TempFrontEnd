import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { LocationService } from './../../../services/location.service';
import { Scope, Role } from './../../../models/user';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  roles;
  scopes;
  constructor(
    private locationService: LocationService,
    private roleservice: RoleService,
    public dialogRef: MdDialogRef<UserCreateComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  user = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required]),

  });


  ngOnInit() {
    this.locationService.getAll().subscribe(locations => {
      this.scopes = locations;
    });

    this.roleservice.getAll().subscribe(roles => {
      this.roles = roles;
    });
  }

  updateRoles(event: any) {
    console.log(event.target);
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
    this.data.roles.push(newRole);
  }

  delRole(event) {
    console.log('delete');
    const delRole: Role = this.data.roles.find(r => r.roleName === event.target.name);
    const i = this.data.roles.indexOf(delRole , 0);
    this.data.roles.splice(i, 1);
  }

  updateScope(event: any) {
    console.log(event.target);
    if (event.target.checked === true) {
      this.addScope(event);
    }else {
      this.delScope(event) ;
    }
  }

  addScope(event) {
    console.log('add');
    const newScope: Scope = {
      'id': 0,
      'name': event.target.name
     };
    this.data.scopes.push(newScope);
  }

  delScope(event) {
    console.log('delete');
    const delScope: Scope = this.data.scopes.find(s => s.nname === event.target.name);
    const i = this.data.roles.indexOf(delScope , 0);
    this.data.scopes.splice(i, 1);
  }

}


