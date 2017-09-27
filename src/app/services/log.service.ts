import { Error404 } from './../common/app-error404';
import { Error400 } from './../common/app-error400';
import { AppError } from './../common/app-error';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor(private http: HttpService) { }
  url = 'http://localhost:5000/api/';

  loginlog(resource) {
    return this.http.post(this.url + 'users/loginlog', resource)
        .map(res => res.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) { return Observable.throw(new Error400(error.json)); }
    if (error.status === 404) { return Observable.throw(new Error404()); }
    return Observable.throw(new AppError());
  }

}
