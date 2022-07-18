import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/category';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/all`);
  }
  save(category: SaveCategory): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, category, this.httpHeaders);
  }
  getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export interface SaveCategory {
  id: number;
  name: string;
  photoUrl: string;
}
