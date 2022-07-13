import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit, OnDestroy {

  productsList: any[] = [];
  msg: string
  isLoader = true;
  myParamSubscribe: Subscription;    // Used to unsubscribe the observable 

  constructor(public pdtSer: ProductsService, public activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.myParamSubscribe = this.activeRoute.params.subscribe({next: (param: Params)=>{
      console.log(param)
      if(param["catid"]) {
        this.getCategorywiseProducts(param["catid"])
      } else {
        this.getAllProducts();
      }
    }
  })

  }

  getAllProducts() {
    this.pdtSer.getListProducts().subscribe({
      next: (data:any[])=>{
        this.isLoader = false;
        console.log(data);
        this.productsList = data;
      }, error: (error:any)=>{
        console.log(error);
      }, complete: ()=>{
        console.log("Completed");
      }
    })
  }

  getCategorywiseProducts(catId:string) {
    this.isLoader = true;
    this.pdtSer.getProductsCategorywise(catId).subscribe({
      next: (data: any[])=>{
        this.isLoader = false;
        console.log("data::", data)
        this.productsList = data;
      }, error:  (error: any)=> {
          console.log(error)
      }, complete: ()=> {
        console.log("Completed");
      }
    })
  }

  addToCart(pdtId: number, pdtPrice: number) {
    this.pdtSer.addToMyCart(pdtId, pdtPrice).subscribe({
      next: (data: any) => {
        console.log(data)
        this.msg = data;
        // this.pdtSer.updateCart.emit(); // Eventemitter way emitting data to other component
        this.pdtSer.updateCart.next(''); // Subject way emitting data to other component
      }, error: (error: any) => {
        console.log(error);
        this.msg =  'Something went wrong!!'
      }
    })
  }

  ngOnDestroy(): void {
    this.myParamSubscribe.unsubscribe();
  }

}
