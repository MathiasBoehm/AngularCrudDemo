import { Injectable } from "@angular/core";
import { PostsService } from "./posts-service";
import { Author } from "./author";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { PostFactory } from './post-factory';
import { Post } from './post';
import { PostRaw } from './post-raw';

@Injectable()
export class MockPostsService extends PostsService {
  private api = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {
    super();
  }

  getRecentPosts(): Observable<Post[]> {
    return this.httpClient
      .get<Author[]>(`${this.api}/posts`)
      .pipe(retry(3), catchError(this.errorHandler));
  }
  
  getAllPosts(): Observable<Post[]> {
    return this.httpClient
      .get<Author[]>(`${this.api}/posts`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  getAuthors(): Observable<Author[]> {
    return this.httpClient
      .get<Author[]>(`${this.api}/authors`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  countPosts(title = '', author = ''): Observable<number> {
    return this.httpClient.get<any>(`${this.api}/posts`, {
      observe: 'response',
      params: new HttpParams()
        .set('title', title)
        .set('author', author)
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

  findPosts(title = '', author = '', sortField = '', sortOrder = 'asc', pageNumber = 0, pageSize = 10): Observable<Post[]> {
    const start = pageNumber * pageSize;
    const end = (pageNumber + 1) * pageSize;
    return this.httpClient.get<PostRaw[]>(`${this.api}/posts`, {
      params: new HttpParams()
        .set('title', title)
        .set('author', author)
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
    console.error("Error ocurred!");
    return throwError(error);
  }
}
