import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { LocationService } from './../../../services/location.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent {

  constructor (
    public dialogRef: MdDialogRef<LocationEditComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
