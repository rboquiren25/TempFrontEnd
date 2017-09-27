import { UserService } from './../../../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RoleService } from './../../../services/role.service';
import { LocationService } from './../../../services/location.service';
import { Scope, Role, User } from './../../../models/user';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number;
  roles;
  scopes;
  constructor(
    private locationService: LocationService,
    private roleservice: RoleService,
    private userService: UserService,
    public dialogRef: MdDialogRef<UserEditComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {  this.id = data.id; }

  user = new FormGroup({
    email: new FormControl('', [Validators.required])
  });


  ngOnInit() {
    this.locationService.getAll().subscribe(locations => {
      this.scopes = locations;
    });

    this.roleservice.getAll().subscribe(roles => {
      this.roles = roles;
    });

    this.userService.get(this.id).subscribe(user => {
      this.data = user;
      console.log(this.data);
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

  get username(){
    return this.data.username;
  }

  checkRole(role: string) {
    if (role) {
      if (this.data.roles !== undefined) {
        const x = this.data.roles.find(r => r.roleName === role);
        if (x) {
          return true;
        }
      }
    }
   return false;
 }

 checkScope(scope: string) {
  if (scope) {
    if (this.data.scopes !== undefined) {
      const x = this.data.scopes.find(s => s.name === scope);
      if (x) {
        return true;
      }
    }
  }
 return false;
}

}
