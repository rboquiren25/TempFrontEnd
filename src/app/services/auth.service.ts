import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { HomeComponent } from './../components/home/home.component';
import { AppComponent } from './../components/app/app.component';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Headers, RequestMethod } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {
  currentUser: any;
  roles: string[] = [];

  constructor(private http: Http, private router: Router, private httpservice: HttpService) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
      this.roles = this.currentUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
  }

  login(credentials) {
    const myHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions();
    options.method = RequestMethod.Post;
    options.headers = myHeaders;
    const body = 'username=' + credentials.username + '&password=' + credentials.password;
     return this.http.post('http://localhost:5000/login', body, options)
      .map(response => {
      const result = response.json();
      if (result && result.token) {
        localStorage.setItem('token', result.token);

        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      }

    });


  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.roles = [];
    this.router.navigate(['/user/login']);
  }

  isLoggedIn() {
    const jwt = new JwtHelper();
    const token = localStorage.getItem('token');
    if (!token) {return false; }
    const expirationDate = jwt.getTokenExpirationDate(token);
    const isExpired = jwt.isTokenExpired(token);
    return !isExpired;
  }

  isAdmin() {
    const jwt = new JwtHelper();
    const token = localStorage.getItem('token');
    const user = jwt.decodeToken(token);
    let roles:  string[] = [];
    roles = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (roles.includes('Administrator')) {
      return true;
    }
    return false;
  }

  get userName() {
    return this.currentUser.sub;
  }

  get ipAdd()
  {
     let ip: string;
     this.httpservice.get('http://smart-ip.net/geoip-json?callback=?').subscribe(response => {
     console.log(response);
     ip = response.toString(); });
     return ip;
  }

}



