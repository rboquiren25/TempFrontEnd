import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent  {


  constructor(
    public dialogRef: MdDialogRef<LocationCreateComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
    ) { }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
