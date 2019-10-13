import { Component, OnInit } from '@angular/core';
import { PostStoreService } from '../shared/post-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../shared/post';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private postStoreService: PostStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  createPost(post: Post) {
    this.postStoreService.createPost(post)
      .subscribe(() => {
        this.router.navigate(['../posts'], { relativeTo: this.route});
      })
  }

}
