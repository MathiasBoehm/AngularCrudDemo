import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Post } from './post';
import { PostFactory } from './post-factory';
import { retry, map, catchError } from 'rxjs/operators';
import { PostRaw } from './post-raw';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {

  private api = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }

  findPosts(sortField = '', sortOrder = 'asc', pageNumber = 0, pageSize = 2): Observable<Post[]> {
    return this.httpClient.get<PostRaw[]>(`${this.api}/posts`, {
      params: new HttpParams()
        .set('_sort', sortField)
        .set('_order', sortOrder)
        .set('_start', pageNumber.toString())
        .set('_end', (pageNumber + pageSize).toString())
    }).pipe(
      retry(3),
      map(rawPosts => 
        rawPosts.map(p => PostFactory.fromRaw(p)),
      ),
      catchError(this.errorHandler)
    );
  }


  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Error ocurred!');
    return throwError(error);
  }
}
