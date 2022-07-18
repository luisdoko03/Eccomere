import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SaveCategory} from "./category.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../common/category";
import {Banner} from "../common/banner";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private baseUrl = 'http://localhost:8080/api/banner';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }
  getBannerList(): Observable<Banner[]> {
    return this.httpClient.get<Banner[]>(`${this.baseUrl}/all`);
  }

  save(banner: SaveBanner): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, banner, this.httpHeaders);
  }
  getById(id: number): Observable<Banner> {
    return this.httpClient.get<Banner>(`${this.baseUrl}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
export interface SaveBanner {
  id: number;
  name: string;
  photoUrl: string;
}
