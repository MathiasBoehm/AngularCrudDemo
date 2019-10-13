import { Component, OnInit } from '@angular/core';
import { PostStoreService } from '../shared/post-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../shared/post';
import { PostFactory } from '../shared/post-factory';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: Post;

  constructor(
    private postStoreService: PostStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post = PostFactory.newPost();
  }

  createPost(post: Post) {
    this.postStoreService.createPost(post)
      .subscribe(() => {
        this.router.navigate(['../../posts'], { relativeTo: this.route});
      })
  }

}
