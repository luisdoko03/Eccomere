import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../common/order";
import {SaveProduct} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private baseUrl = 'http://localhost:8080/api/order';
  constructor(private httpClient: HttpClient) { }

  getOrderList(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/all`);
  }

  saveOrderClient(orderClient: SaveOrderClient): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, orderClient, this.httpHeaders);
  }

}
export interface SaveOrderClient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  productId: number;
  quantity: number;
  finalPrice: number;
}
