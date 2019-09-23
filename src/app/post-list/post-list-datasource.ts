import { DataSource } from '@angular/cdk/table';
import { Post } from '../shared/post';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PostStoreService } from '../shared/post-store.service';

export class PostListDatasource extends DataSource<Post> {

    private postsSubject = new BehaviorSubject<Post[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private postStoreService: PostStoreService) {
        super();
    }
    
    connect(): Observable<Post[]> {
        return this.postsSubject.asObservable();
    }

    disconnect() {
        this.postsSubject.complete();
        this.loadingSubject.complete();
    }

    loadPosts(sortField = '', sortOrder = 'asc',
                pageNumber = 0, pageSize = 2) {

        this.loadingSubject.next(true);

        this.postStoreService.findPosts(sortField, sortOrder, pageNumber, pageSize)
                    .pipe(
                        catchError(() => of([])),
                        finalize(() => this.loadingSubject.next(false))
                    )
                    .subscribe(posts => this.postsSubject.next(posts));
    }
}
