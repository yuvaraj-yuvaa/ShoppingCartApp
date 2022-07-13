import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { ViewcartComponent } from '../viewcart/viewcart.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewcartComponent,
    AddproductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
