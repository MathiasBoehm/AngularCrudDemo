import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './author';
import { Post } from './post';

@Injectable()
export abstract class PostsService {

    abstract getRecentPosts(): Observable<Post[]>;

    abstract getAllPosts(): Observable<Post[]>;

    abstract getAuthors(): Observable<Author[]>;

    abstract countPosts(title: string, author: string): Observable<number>;

    abstract findPosts(title: string, author: string, sortField: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<Post[]>;
    
    abstract getPost(id: string): Observable<Post>;
    
    abstract createPost(post: Post): Observable<any>;

    abstract updatePost(post: Post): Observable<any>
    
    abstract deletePost(post: Post): Observable<any>;

}