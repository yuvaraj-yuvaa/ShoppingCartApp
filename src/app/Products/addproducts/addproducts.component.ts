import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  msg: any;
  categories: any[] = [];
  selectedImg: any;

  constructor(public pdtSer: ProductsService) { }

  ngOnInit(): void {

    this.pdtSer.getCategories().subscribe({
      next: (data)=>{
        console.log(data);
        this.categories = data;
      }, error: (error: any) => {
        console.log(error)
      }
    })

  }

  selectImage(event: any) {
    this.selectedImg = event.target.files[0]
    console.log(this.selectedImg);
  }

  createProducts(form: NgForm) {
    var fd = new FormData();
    fd.append('catId', form.value.catId),
    fd.append('pdtName', form.value.pdtName),
    fd.append('pdtDesc', form.value.pdtDesc),
    fd.append('pdtPrice', form.value.pdtPrice),
    fd.append('pdtImg', this.selectedImg)

    console.log(form.value)

    this.pdtSer.addProducts(fd).subscribe({
      next: (data: any) => {
        console.log(data);
        this.msg = data;
        form.reset();
      }, error : (error: any )=> {
        console.log(error)
      }
    })

  }

  

}
