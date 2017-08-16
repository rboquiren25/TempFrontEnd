import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  msg;

  constructor(@Inject(MD_DIALOG_DATA) data: any) {
    console.log('Data', data);
    this.msg = data.msg;
  }

  ngOnInit() {
  }

}
