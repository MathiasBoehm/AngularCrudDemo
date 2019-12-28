import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Post } from '../shared/post';
import { PostsService } from '../shared/posts-service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id: string) => this.postsService.getPost(id))
    )
    .subscribe(post => this.post = post);
  }

  updatePost(post: Post) {
    this.postsService.updatePost(post)
      .subscribe(() => {
        this.router.navigate(['/admin/posts'], { relativeTo: this.route });
      });
  }
}
