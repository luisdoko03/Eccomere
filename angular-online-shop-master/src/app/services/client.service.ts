import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../common/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/api/client';
  constructor(private httpClient: HttpClient) { }

  getClientList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.baseUrl}/all`);
  }
  findById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseUrl}/${id}`);
  }
  delete(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

}
