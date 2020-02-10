import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin/posts',
    component: PostListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin/edit-post/:id',
    component: EditPostComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin/create-post',
    component: CreatePostComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
