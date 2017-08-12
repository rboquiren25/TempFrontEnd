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


  constructor(private http: Http) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
      this.roles = this.currentUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    }
  }

  login(credentials) {
    let myHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions();
    options.method = RequestMethod.Post;
    options.headers = myHeaders;
    let body = 'username=' + credentials.username + '&password=' + credentials.password;
     return this.http.post('http://localhost:5000/user/login', body, options)
      .map(response => {
      const result = response.json();
      console.log(result);
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
  }

  isLoggedIn() {
    let jwt = new JwtHelper();
    let token = localStorage.getItem('token');
    if (!token) return false;
    
    let expirationDate = jwt.getTokenExpirationDate(token);
    let isExpired = jwt.isTokenExpired(token);
    return !isExpired;
  }

  isInRole(RoleName){
    return this.roles.indexOf(RoleName) > -1;
  }


}



