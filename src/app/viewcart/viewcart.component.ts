import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  myCartItems: any[]= [];
  myCartFinalPrice: number = 0;
  msg: any;

  constructor(public pdtSer: ProductsService, public myRouter: Router) { }

  ngOnInit(): void {
    this.pdtSer.getMyCartProducts().subscribe({
      next: (data:any[])=> {
        console.log(data);
        this.myCartItems = data;
        this.myCartItems.forEach((res)=>{
          console.log('res:::', res)
          this.myCartFinalPrice += res.cartPdtPrice;
         // console.log('myCartFinalPrice:::', this.myCartFinalPrice)

        })
      }, error: (error:any)=> {
        console.log(error);
        if(error.status === 401) {
          localStorage.clear();
          this.myRouter.navigateByUrl('/login');
        }

      }
    })
  }

  updateCart(cartId: number, cartQty: number, pdtPrice: number) {
    this.pdtSer.updateMyCartItems(cartId, cartQty, pdtPrice).subscribe({
      next: (data: string) => {
        console.log(data);
        this.msg = data;
        // To find cart index
        let cartIndex = this.myCartItems.findIndex((obj) => {
          return obj._id == cartId;       
        });
        this.myCartItems[cartIndex].cartPdtQty = cartQty;
        this.myCartItems[cartIndex].cartPdtPrice = cartQty*pdtPrice;
        // update cart total amount
        this.myCartFinalPrice = 0;
        this.myCartItems.forEach((res)=>{
          this.myCartFinalPrice += res.cartPdtPrice;
        });
        
      }, error : (error: any) => {
        console.log(error);
        this.msg = "Something went wrong!!"
      }
    });
  }

  deleteCart(cartid: number) {
    this.pdtSer.removeCartItems(cartid).subscribe({
      next: (data)=> {
        this.msg = data;
        let removeItem = this.myCartItems.filter((obj)=>{
          return obj._id != cartid;
        });
        this.myCartItems = removeItem;

        // update cart total amount
        this.myCartFinalPrice = 0;
        this.myCartItems.forEach((res)=>{
          this.myCartFinalPrice += res.cartPdtPrice;
        });
        this.pdtSer.updateCart.next('');
      }, error :  (error: any) => {
        console.log(error);
        this.msg = "Something went wrong!!"
      }
    })
  }

}
