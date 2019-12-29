import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BackButtonDirective } from './shared/back-button-directive';

import { QuillModule } from 'ngx-quill';
import { PostsService } from './shared/posts-service';
import { RealPostsService } from './shared/real-posts-service';

import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    CreatePostComponent,
    EditPostComponent,
    HomeComponent,
    PostDetailComponent,
    PostFormComponent,
    BackButtonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:9090/api'], sendAccessToken: true
      }
    })
  ],
  providers: [{provide: PostsService, useClass: RealPostsService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
