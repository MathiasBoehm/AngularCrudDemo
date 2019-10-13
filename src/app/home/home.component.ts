import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { PostStoreService } from '../shared/post-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(private postStoreService: PostStoreService) { }

  ngOnInit() {
      this.postStoreService.findPosts('title', 'desc', 0, 8)
        .subscribe(posts => this.posts = posts)
  }

}
