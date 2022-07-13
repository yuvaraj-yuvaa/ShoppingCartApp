import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catgeories: any[] = []

  constructor(public pdtSer: ProductsService) { }

  ngOnInit(): void {

    this.pdtSer.getCategories().subscribe({
      next: (data: any[])=> {
        console.log(data);
        this.catgeories = data;
      }, error: (error: any) => {
        console.log(error);
      }
    })
  }

}
