import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service'

@Injectable()
export class TokeninterceptorService implements HttpInterceptor{

  constructor(public userSer: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Req is on the way");
    
    var tokenizedReq = req.clone({
      setHeaders: {
        'myauthtoken': this.userSer.getMyToken() ? this.userSer.getMyToken() : ''
      }
    });
    return next.handle(tokenizedReq) 
  }

}
