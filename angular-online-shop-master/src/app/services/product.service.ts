import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {Category} from "../common/category";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/product';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/all`);
  }
  save(product: SaveProduct): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, product, this.httpHeaders);
  }
  getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
export interface SaveProduct {
  id: number,
  title: string,
  photoUrl: string,
  price: number,
  quantity: number,
}
