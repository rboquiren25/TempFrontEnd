import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LocationService extends DataService {

  constructor(http: HttpService) {
    super('/api/locations', http);
  }

}
