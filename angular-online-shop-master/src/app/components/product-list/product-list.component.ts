import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

   listProducts() {
    this.productService.getProductList().subscribe(
      data => {

       this.products = data}
    )
  }
  updateProduct(): void {
    this.productService.getProductList().subscribe(response => {
      this.products = response;
    });
  }

  onDeleteProduct(id: number): void {
    const shouldDelete = confirm('Are you sure you want to delete it?');
    if (shouldDelete) {
      this.productService.delete(id).subscribe(response => {
        this.updateProduct();
      });
    }
  }
}
