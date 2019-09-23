import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PostStoreService } from '../shared/post-store.service';
import { MatPaginator, MatSort } from '@angular/material';
import { PostListDatasource } from './post-list-datasource';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: PostListDatasource;

  displayedColumns = ["id", "title", "author"];

  constructor(private postStoreService: PostStoreService) { }

  ngOnInit() {
    this.dataSource = new PostListDatasource(this.postStoreService);
    this.dataSource.loadPosts('title', 'asc', 0, 2);
  }

  ngAfterViewInit(): void {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPostsPage())
      )
      .subscribe();
  }
  

  onRowClicked(row: any) {
    console.log('Row clicked ' + row);
  }

  loadPostsPage() {
    this.dataSource.loadPosts(
      this.sort.active, 
      this.sort.direction, 
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
