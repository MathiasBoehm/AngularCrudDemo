import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../shared/post';
import { PostsService } from '../shared/posts-service';
import { PostListDatasource } from './post-list-datasource';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Author } from '../shared/author';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: PostListDatasource;

  authors: Author[];

  displayedColumns = ["id", "title", "author", "created", "actions"];

  searchForm: FormGroup;

  constructor(private postsService: PostsService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.postsService.getAuthors().subscribe(authors => this.authors = authors);
    this.initForm();
    this.dataSource = new PostListDatasource(this.postsService);
    this.dataSource.loadPosts('', '', 'title', 'asc', 0, 10);
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
 
  deletePost(post: Post) {
    if (confirm('Really delete Post?')) {
      this.postsService.deletePost(post)
        .subscribe(() => this.loadPostsPage());
    }
  }

  loadPostsPage() {
    this.dataSource.loadPosts(
      '',
      '',
      this.sort.active, 
      this.sort.direction, 
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  submitForm() {
    const formValue = this.searchForm.value;
    this.dataSource.loadPosts(
      formValue.title,
      formValue.author,
      this.sort.active, 
      this.sort.direction, 
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  private initForm() {
    if (this.searchForm) {
      return;
    }

    this.searchForm = this.fb.group({
      title: [''],
      author: ['']
    });
  }
}
