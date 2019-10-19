import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Author } from './author';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorStoreService {

  private api = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${this.api}/authors`).pipe(
      retry(3),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Error ocurred!');
    return throwError(error);
  }
}
