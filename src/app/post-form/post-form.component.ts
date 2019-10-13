import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../shared/post";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnChanges {

  postForm: FormGroup;

  @Input() post: Post;
  @Output() submitPost = new EventEmitter<Post>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.post);
  }

  submitForm() {
    const formValue = this.postForm.value;
    const newPost: Post = {
      ...formValue
    };
    this.submitPost.emit(newPost);
    this.postForm.reset();
  }
  
  private initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      authorImageUrl: [''],
      content: ['']
    });
  }

  private setFormValues(post: Post) {
    this.postForm.patchValue(post);
  }


}
