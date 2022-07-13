import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // updateCart = new EventEmitter() // We can use this and Subject as well

  updateCart = new Subject()

 // updateCart = new BehaviorSubject('Default Emit') // This is for BehaviorSubject


  constructor(public http: HttpClient, public userSer: UsersService) { }

  getListProducts() {

  return this.http.get<any[]>("https://credo-shoppingcartv5.herokuapp.com/listproducts");
  }

  /* getMyCartProducts() {
    return this.http.get<any[]>("https://credo-shoppingcartv5.herokuapp.com/mycart", {
      'headers': new HttpHeaders({
        'myauthtoken': this.userSer.getMyToken() ? this.userSer.getMyToken() : ''
      })
    });
  } */
  getMyCartProducts() {
    return this.http.get<any[]>("https://credo-shoppingcartv5.herokuapp.com/mycart");
  }

  getCategories() {
    return this.http.get<any[]>("https://credo-shoppingcartv5.herokuapp.com/getcategories");
  }

  getProductsCategorywise(catId:string) {
    return this.http.get<any[]>("https://credo-shoppingcartv5.herokuapp.com/getpdtcatwise/"+catId);
  }
  
  addProducts(data: any) {
    return this.http.post<string>("https://credo-shoppingcartv5.herokuapp.com/addproducts", data);
  }

  addToMyCart(pdtId: number, pdtPrice: number) {
    return this.http.post<string>("https://credo-shoppingcartv5.herokuapp.com/addtocart", {cartPdtId: pdtId, cartPdtPrice: pdtPrice})
  }

  getMyCartCount() {
    return this.http.get<number>("https://credo-shoppingcartv5.herokuapp.com/cartcount")
  }

  updateMyCartItems(cartId: number, cartQty: number, pdtPrice: number) {
    return this.http.put<string>("https://credo-shoppingcartv5.herokuapp.com/updatecart", {'cartId': cartId, 'cartPdtQty': cartQty, 'pdtPrice': pdtPrice})
  }

  removeCartItems(catId: number) {
    return this.http.delete<string>("https://credo-shoppingcartv5.herokuapp.com/removecart/"+catId)
  }

}
