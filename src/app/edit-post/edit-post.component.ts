import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { PostStoreService } from '../shared/post-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post;

  constructor(
    private postStoreService: PostStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap((id: string) => this.postStoreService.getPost(id))
    )
    .subscribe(post => this.post = post);
  }

  updatePost(post: Post) {
    this.postStoreService.updatePost(post)
      .subscribe(() => {
        this.router.navigate(['/admin/posts'], { relativeTo: this.route });
      });
  }
}
