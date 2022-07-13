import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItems: number = 0;

  constructor(public userSer: UsersService, public myRouter: Router, public pdtSer: ProductsService) { }

  ngOnInit(): void {

    this.pdtSer.updateCart.subscribe({  // transfer data from list component using event emitter or Subject
      next: (data?: any) => {
        console.log("Event Emitted!!");
        this.getCarCount();
      }
    })

    this.getCarCount();
  }

  doLogout() {
    this.cartItems = 0;
    localStorage.clear();
    this.myRouter.navigateByUrl("/login");
  }

  getCarCount() {
    this.pdtSer.getMyCartCount().subscribe({
      next: (data: number) => {
        console.log(data);
        this.cartItems = data;
      }, error : (error: any) => {
        console.log(error)
      }
    })
  }

}
