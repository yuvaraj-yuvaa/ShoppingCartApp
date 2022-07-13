import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AddproductsComponent } from '../Products/addproducts/addproducts.component';
import { ViewcartComponent } from '../viewcart/viewcart.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'viewcart', component: ViewcartComponent, canActivate: [AuthGuard]},
    {path: 'addproducts', component: AddproductsComponent, canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
