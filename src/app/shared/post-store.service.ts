import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {

  private api = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  findPosts(sortField = '', sortOrder = 'asc', pageNumber: 0, pageSize: 2): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.api}/posts`, {
      params: new HttpParams()
        .set('_sort', sortField)
        .set('_order', sortOrder)
        .set('_start', pageNumber.toString())
        .set('_end', (pageNumber + pageSize).toString())
    });
  }
}
