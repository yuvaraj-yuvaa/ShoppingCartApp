import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userSer: UsersService, public myRouter: Router) {

  }

  canActivate(): boolean {
    
    if(!this.userSer.isLoggedIn()) { // true
      localStorage.clear();
      this.myRouter.navigateByUrl("/login");
    }
    return this.userSer.isLoggedIn();
  }
  
}
