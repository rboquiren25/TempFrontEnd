import { LocationService } from './../../../services/location.service';
import { Scope } from './../../../models/user';
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
    public dialogRef: MdDialogRef<UserCreateComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(locations => {
      this.scopes = locations;
    });
  }

}


