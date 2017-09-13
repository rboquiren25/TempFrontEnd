import { LocationEditComponent } from './../location-edit/location-edit.component';
import { ConfirmComponent } from './../../dialogs/confirm/confirm.component';
import { Location } from './../../../models/location';
import { Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { LocationService } from './../../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { LocationCreateComponent } from './../location-create/location-create.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
locations;

  constructor(
    private locationService: LocationService,
    public dialog: MdDialog,
    private router: Router,
    private ToastyService: ToastyService
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(locations => {
      this.locations = locations;
    });
  }

  createLocation() {
    let newlocation: Location;
    this.dialog.open(LocationCreateComponent, {
      width: '500px',
      height: '180px',
      data: { name: newlocation }
    }).afterClosed().subscribe(result => {
      if (result) {
        newlocation = result;
        if (newlocation.name.trim().length > 0) {
          this.locationService.create(newlocation).subscribe(newlocationsaved => {
            this.ToastyService.success({
              title: 'Success',
              msg: 'New location created',
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
            });
            this.locationService.getAll().subscribe(locations => {
              this.locations = locations;
            });
          });
        } else {
          this.ToastyService.warning({
            title: 'Warning',
            msg: 'Invalid location name',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        }
      }
    });
  }

  deleteLocation(id: number) {
    this.dialog.open(ConfirmComponent, {
      width: '220px',
      height: '150px',
    })
     .afterClosed().subscribe(result => {
       if (result) {
           this.locationService.delete(id).subscribe(resultDel => {
             if (resultDel) {
              this.ToastyService.success({
                title: 'Success',
                msg: 'Location deleted',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
              });
               this.locationService.getAll().subscribe(locations => {
                 this.locations = locations;
               });
             } else {
               console.log('bad request');
             }
           });
       }
     });
  }

  editLocation(id: number) {
    let editlocation: Location;

    this.locationService.get(id).subscribe(location => {
      editlocation = location;
      this.dialog.open(LocationEditComponent, {
        width: '550px',
        height: 'auto',
        data: { name: editlocation.name, id: editlocation.id }
      }).afterClosed().subscribe(result => {
          if (result) {
            editlocation = result;
            if (editlocation.name.trim().length > 0 ) {
              this.locationService.update(editlocation).subscribe(updtdlocation => {
                if (updtdlocation) {
                  this.ToastyService.success({
                    title: 'Success',
                    msg: 'Location updated',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 5000
                  });
                  this.locationService.getAll().subscribe(locations => {
                    this.locations = locations;
                  });
                }
              });
            }else {
              this.ToastyService.warning({
                title: 'Warning',
                msg: 'Invalid location name',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
              });
            }
          }
        });
    });
  }

}
