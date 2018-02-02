import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class UserService {

  private isUserLoggedIn;
  public username;

  constructor(private http: Http) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(name) {
    // this.isUserLoggedIn = true;
    // this.username = name;
    if (!localStorage.getItem('currentUser')) {
      //localStorage.setItem('currentUser', JSON.stringify({ UserName:name }));
      localStorage.setItem('currentUser', name);
    }
  }

  getUserLoggedIn() {
    // return this.isUserLoggedIn;
    return localStorage.getItem('currentUser');
  }



  getUserDetails(term: string) {
    return this.http
      .get("http://localhost:3000/users/?name=" + term)
      .map(response => response.json() as User).toPromise()
    //.then((res)=>console.log(res));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    //this.token = null;
    console.log("it came to logout")
    localStorage.removeItem('currentUser');
    console.log("it came after logout")
  }

}