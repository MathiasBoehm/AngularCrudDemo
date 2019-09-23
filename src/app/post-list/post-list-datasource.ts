import { DataSource } from '@angular/cdk/table';
import { Post } from '../shared/post';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { PostStoreService } from '../shared/post-store.service';

export class PostListDatasource extends DataSource<Post> {

    constructor(private paginator: MatPaginator, private sort: MatSort,  private postStoreService: PostStoreService) {
        super();
    }
    
    connect(): Observable<Post[]> {
        return this.postStoreService.getAll();
    }

    disconnect() {}

}
