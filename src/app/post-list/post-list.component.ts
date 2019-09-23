import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../shared/post';
import { PostStoreService } from '../shared/post-store.service';
import { MatPaginator, MatSort } from '@angular/material';
import { PostListDatasource } from './post-list-datasource';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PostListDatasource;

  constructor(private postStoreService: PostStoreService) { }

  ngOnInit() {
    this.dataSource = new PostListDatasource(this.paginator, this.sort, this.postStoreService);
  }

}
