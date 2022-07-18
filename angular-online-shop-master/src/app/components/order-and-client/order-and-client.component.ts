import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderClient} from "../../common/order-client";
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {OrderService} from "../../services/order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-and-client',
  templateUrl: './order-and-client.component.html',
  styleUrls: ['./order-and-client.component.css']
})
export class OrderAndClientComponent implements OnInit {
  productList: Product[];
  orderClientForm = new FormGroup({});

  constructor(private orderService: OrderService, private productService: ProductService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
    this.orderClientForm = this.createClientForm({} as OrderClient);
  }

  createClientForm(orderClient: OrderClient): FormGroup {
    return new FormGroup({
      firstName: new FormControl(orderClient.firstName, Validators.required),
      lastName: new FormControl(orderClient.lastName, Validators.required),
      email: new FormControl(orderClient.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(orderClient.phoneNumber),
      productId: new FormControl(orderClient.productId),
      quantity: new FormControl(orderClient.quantity),
      finalPrice: new FormControl(orderClient.finalPrice)

    });
  }
  listProducts() {
    this.productService.getProductList().subscribe(
      data => {

        this.productList = data}
    )
  }
  onSubmit() {
    this.orderService.saveOrderClient(this.orderClientForm.value)
      .subscribe(response => {
        return this.router.navigate(['/orders']);
      });
  }
}
