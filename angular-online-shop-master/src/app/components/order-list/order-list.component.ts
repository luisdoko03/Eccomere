import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../common/order";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.listOrders()
  }
listOrders() {
    this.orderService.getOrderList().subscribe(data => {
      this.orders = data;
    })
}
}
