import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Post } from '../shared/post';
import { PostsService } from '../shared/posts-service';

export class PostListDatasource extends DataSource<Post> {

    private postsSubject = new BehaviorSubject<Post[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    public loading$ = this.loadingSubject.asObservable();
    public totalCount: number;

    constructor(private postsService: PostsService) {
        super();
    }
    
    connect(): Observable<Post[]> {
        return this.postsSubject.asObservable();
    }

    disconnect() {
        this.postsSubject.complete();
        this.loadingSubject.complete();
    }

    loadPosts(title = '', author = '', sortField = '', sortOrder = 'asc',
                pageNumber = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.postsService.countPosts(title, author).subscribe(count => this.totalCount = count);
        
        this.postsService.findPosts(title, author, sortField, sortOrder, pageNumber, pageSize)
                    .pipe(
                        catchError(() => of([])),
                        finalize(() => this.loadingSubject.next(false))
                    )
                    .subscribe(posts => this.postsSubject.next(posts));
    }
}
