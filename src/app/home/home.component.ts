import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { PostsService } from '../shared/posts-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
      this.postsService.getAllPosts()
        .subscribe(posts => this.posts = posts)
  }

}
