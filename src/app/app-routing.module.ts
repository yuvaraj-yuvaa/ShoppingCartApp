import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ListproductsComponent } from './Products/listproducts/listproducts.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { CategoryComponent } from './category/category.component';
import { AddproductsComponent } from './Products/addproducts/addproducts.component';

const routes: Routes = [
  {path: '', component: ListproductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'categories', redirectTo: '/', pathMatch:'full'},
  {path: 'categories/:catid', component: ListproductsComponent},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path: '**', component: NotfoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
//  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // Async Routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
