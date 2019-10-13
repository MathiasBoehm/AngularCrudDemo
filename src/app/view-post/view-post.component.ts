import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { PostStoreService } from '../shared/post-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  post: Post;

  constructor(private postStoreService: PostStoreService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.postStoreService.getPost(params.get('id'))
      .subscribe(p => this.post = p);
  }

}
