import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../shared/post';
import { PostFactory } from '../shared/post-factory';
import { PostsService } from '../shared/posts-service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: Post;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post = PostFactory.newPost();
  }

  createPost(post: Post) {
    this.postsService.createPost(post)
      .subscribe(() => {
        this.router.navigate(['/admin/posts']);
      })
  }

}
