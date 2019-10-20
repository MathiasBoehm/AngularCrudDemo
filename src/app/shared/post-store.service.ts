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

  countPosts(): Observable<number> {
    return this.httpClient.get<any>(`${this.api}/posts`, {
      observe: 'response',
      params: new HttpParams()
        .set('_sort', '')
        .set('_order', 'asc')
        .set('_start', '0')
        .set('_end', '0'),
    }).pipe(
      retry(3),
      map(resp => Number.parseInt(resp.headers.get('X-Total-Count'))),
      catchError(this.errorHandler)
    );
  }

  findPosts(sortField = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Post[]> {
    const start = pageNumber * pageSize;
    const end = (pageNumber + 1) * pageSize;
    return this.httpClient.get<PostRaw[]>(`${this.api}/posts`, {
      params: new HttpParams()
        .set('_sort', sortField)
        .set('_order', sortOrder)
        .set('_start', start.toString())
        .set('_end', end.toString())
    }).pipe(
      retry(3),
      map(rawPosts => 
        rawPosts.map(p => PostFactory.fromRaw(p)),
      ),
      catchError(this.errorHandler)
    );
  }

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<PostRaw>(`${this.api}/posts/${id}`)
      .pipe(
        retry(3),
        map(rawPost => PostFactory.fromRaw(rawPost)),
        catchError(this.errorHandler)
      );
  }

  createPost(post: Post): Observable<any> {
    return this.httpClient.post(`${this.api}/posts`,
      PostFactory.toRaw(post)
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  updatePost(post: Post): Observable<any> {
    return this.httpClient.put(
      `${this.api}/posts/${post.id}`,
      PostFactory.toRaw(post)
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  deletePost(post: Post): Observable<any> {
    return this.httpClient.delete(`${this.api}/posts/${post.id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Error ocurred!');
    return throwError(error);
  }
}
