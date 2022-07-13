import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isUsernameAvail = false;
  msg: string;

  constructor(public userSer: UsersService, public myRouter: Router, public pdtSer: ProductsService) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      // 'Username': new FormControl(null, Validators.required),
      // 'Password': new FormControl(null, [Validators.required, Validators.minLength(4)])
      "Username": new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z-]+$/), Validators.minLength(2)] ),
      "Password": new FormControl(null, [Validators.required, Validators.pattern(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/), Validators.minLength(2)])
    });

    $('.toggle').click(()=>{
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
      height: "toggle",
      'padding-top': 'toggle',
      'padding-bottom': 'toggle',
      opacity: "toggle"
      }, "slow");
    });
  }

  get userNameCtrl() {
    return this.loginForm.get('Username');
  }

  get userPasswordCtrl() {
    return this.loginForm.get('Password');
  }

  getUserData() {
    this.loginForm.patchValue({
      'Username': 'admin'
    });
  }

  doLogin()
  {
    console.log(this.loginForm.value);
    this.userSer.userLogin(this.loginForm.value).subscribe({
      next: (data:string)=> {
       if(data.length > 0) {
        this.loginForm.reset();
        localStorage.setItem("loggeduser", data);
        this.myRouter.navigateByUrl('/');
        this.pdtSer.updateCart.next('');
       } else {
        this.msg = "Invalid Username / Password";
       }
       
      }, error: (error)=>{
        console.log(error);
        this.msg = "Something went wrong!"
      }
    })
   
  }

  usernameCheck(username:string) {
    this.userSer.usernameCheckAvailability(username).subscribe({
      next: (data:number)=>{

        if(data===0) {
          this.isUsernameAvail = true;
        } else {
          this.isUsernameAvail = false;
        }
       
      }, error: (error:any)=> {
        console.log(error);
      }
    })
  }

  doRegistration(form:NgForm)
  {
    this.userSer.userRegisteration(form.value).subscribe({
      next: (data:string)=>{
        console.log(data);
        this.msg = data;
        form.reset();
      }, error: (error:any)=>{
        console.log(error);
      }
    })
  }

}
