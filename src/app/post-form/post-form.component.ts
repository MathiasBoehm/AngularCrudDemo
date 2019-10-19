import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Post} from "../shared/post";
import { AuthorStoreService } from '../shared/author-store.service';
import { Author } from '../shared/author';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnChanges {

  authors: Author[];

  postForm: FormGroup;

  @Input() post: Post;
  @Output() submitPost = new EventEmitter<Post>();

  constructor(private fb: FormBuilder, private authoreStoreService: AuthorStoreService) { }

  ngOnInit() {
    this.authoreStoreService.getAll().subscribe(authors => this.authors = authors);
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
