import { Injectable } from "@angular/core";
import { PostsService } from "./posts-service";
import { Author } from "./author";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { PostFactory } from "./post-factory";
import { Post } from "./post";
import { PostRaw } from "./post-raw";

@Injectable()
export class RealPostsService extends PostsService {
  private api = "http://localhost:9090";

  constructor(private httpClient: HttpClient) {
    super();
  }

  getAuthors(): Observable<Author[]> {
    return this.httpClient
      .get<Author[]>(`${this.api}/authors`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  countPosts(): Observable<number> {
    return this.httpClient
      .get<Number>(`${this.api}/posts/count`)
      .pipe(retry(3), catchError(this.errorHandler));
  }

  findPosts(
    sortField = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 10
  ): Observable<Post[]> {
    const start = pageNumber * pageSize;
    const end = (pageNumber + 1) * pageSize;
    return this.httpClient
      .get<PostRaw[]>(`${this.api}/posts`, {
        params: new HttpParams()
          .set('_sort', sortField)
          .set('_order', sortOrder)
          .set('_page', pageNumber.toString())
          .set('_size', pageSize.toString())
      })
      .pipe(
        retry(3),
        map(rawPosts => rawPosts.map(p => PostFactory.fromRaw(p))),
        catchError(this.errorHandler)
      );
  }

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<PostRaw>(`${this.api}/posts/${id}`).pipe(
      retry(3),
      map(rawPost => PostFactory.fromRaw(rawPost)),
      catchError(this.errorHandler)
    );
  }

  createPost(post: Post): Observable<any> {
    return this.httpClient
      .post(`${this.api}/posts`, PostFactory.toRaw(post))
      .pipe(catchError(this.errorHandler));
  }

  updatePost(post: Post): Observable<any> {
    return this.httpClient
      .put(`${this.api}/posts/${post.id}`, PostFactory.toRaw(post))
      .pipe(catchError(this.errorHandler));
  }

  deletePost(post: Post): Observable<any> {
    return this.httpClient
      .delete(`${this.api}/posts/${post.id}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error("Error ocurred!");
    return throwError(error);
  }
}
