import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service'
import { Router } from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate, CanActivateChild {

  constructor(private user: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //this.router.navigate(['/']);
    //console.log('You are not authenticated');
    // if(this.user.getUserLoggedIn())
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivateChild(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

