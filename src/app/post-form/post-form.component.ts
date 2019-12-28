import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../shared/author';
import { Post } from "../shared/post";
import { PostsService } from '../shared/posts-service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnChanges {

  authors: Author[];

  postForm: FormGroup;

  editorStyle = {
    height: '200px'
  };

  @Input() post: Post;
  @Output() submitPost = new EventEmitter<Post>();

  constructor(private fb: FormBuilder, private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAuthors().subscribe(authors => this.authors = authors);
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.post);
  }

  submitForm() {
    const formValue = this.postForm.value;
    const newPost: Post = {
      ...formValue,
      id: this.post.id,
      authorImageUrl: this.getAuthorImageUrl(formValue.author)
    };
    this.submitPost.emit(newPost);
    this.postForm.reset();
  }
  
  private getAuthorImageUrl(authorName: string) {
    const author = this.authors.find(author => author.name == authorName);
    return author.imageUrl;
  }

  private initForm() {
    if (this.postForm) {
      return;
    }


    this.postForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['']
    });
  }

  private setFormValues(post: Post) {
    this.postForm.patchValue(post);
  }


}
