import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  usernameCheckAvailability(username:string) {
  return  this.http.get<number>("https://credo-shoppingcartv5.herokuapp.com/usernamecheck/"+username);
  }

  userRegisteration(data:any) {
   return this.http.post<string>("https://credo-shoppingcartv5.herokuapp.com/register", data);
  }

  userLogin(data:string) {
    return this.http.post<string>("https://credo-shoppingcartv5.herokuapp.com/login", data);
  }

  isLoggedIn() {
    return !!localStorage.getItem("loggeduser");
  }

  getMyToken() {
    return localStorage.getItem("loggeduser");
  }
}
