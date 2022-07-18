import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../common/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api/blog';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }
  getBlogList(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/all`);
  }

  save(request: SavePost): Observable<number> {
    return this.httpClient.post<number>(`${this.baseUrl}`, request, this.httpHeaders);
  }
  getById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}

export interface SavePost {
  id: number;
  title: string;
  createdAt: Date;
  author: string;
  content: string;
  photo: string;
}
