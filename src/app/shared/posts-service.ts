import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './author';
import { Post } from './post';

@Injectable()
export abstract class PostsService {

    abstract getAuthors(): Observable<Author[]>;

    abstract countPosts(): Observable<number>;

    abstract findPosts(sortField: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<Post[]>;
    
    abstract getPost(id: string): Observable<Post>;
    
    abstract createPost(post: Post): Observable<any>;

    abstract updatePost(post: Post): Observable<any>
    
    abstract deletePost(post: Post): Observable<any>;
}