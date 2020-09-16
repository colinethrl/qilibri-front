import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-own-posts',
  templateUrl: './own-posts.component.html',
  styleUrls: ['./own-posts.component.scss']
})
export class OwnPostsComponent implements OnInit {

  constructor(
    private postService: PostService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) { }

  posts: Array<Post>;
  addForm: FormGroup;
  minDate = new Date();
  loadingPublish = false;
  loading = true;
  editedPost: Post;
  editForm: FormGroup;
  loadingEdit = false;

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.postService.getOwnPosts().subscribe((postsFromApi: any) => {
      this.loading = false
      this.posts = postsFromApi.map((postFromApi : any) => Post.apiToModel(postFromApi))
    }, err => {
      this.loading = false
      this.messageService.message("An problem occured, please check your connexion and try again", "error")
    })
  }

  published(post: Post) {
    if (!post.publishedAtDate) {
      return null
    } else if (post.publishedAtDate > new Date()) {
      return "to_be_published"
    } else if (post.publishedAtDate <= new Date()) {
      return "published"
    }
  }

  addPost() {
    this.addForm = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      body: new FormControl(null,[Validators.required]),
      publishedAt: new FormControl(null),
    })
  }

  publish(when) {
    this.loadingPublish = true
    let publishedAt = null
    if (when === 'now') {
      publishedAt = moment.now() / 1000
    } else if (when === 'later') {
      publishedAt = parseInt(moment(this.addForm.controls.publishedAt.value).format("X"))
    }
    let post = {
      title: this.addForm.controls.title.value,
      body: this.addForm.controls.body.value,
      published_at: publishedAt
    }
    this.postService.createPost(post).subscribe(() => {
      this.addForm = null
      this.loadingPublish = false
      this.getPosts()
      this.messageService.message("Post created successfully !", "success")
    }, err => {
      this.loadingPublish = false
      this.messageService.message("An problem occured, please check your connexion and try again", "error")
    })
  }

  editPost(post) {
    this.editedPost = post
    let publishedAt = post.publishedAtDate > new Date() ? post.publishedAtDate : null
    this.editForm = new FormGroup({
      title: new FormControl(post.title,[Validators.required]),
      body: new FormControl(post.body,[Validators.required]),
      publishedAt: new FormControl(publishedAt),
    })
  }

  edit(when) {
    this.loadingEdit = true
    let publishedAt = null
    if (when === 'now') {
      publishedAt = moment.now() / 1000
    } else if (when === 'later') {
      publishedAt = parseInt(moment(this.editForm.controls.publishedAt.value).format("X"))
    }
    let post = {
      id: this.editedPost.id,
      title: this.editForm.controls.title.value,
      body: this.editForm.controls.body.value,
      published_at: publishedAt
    }
    this.postService.editPost(post).subscribe(() => {
      this.editForm = null
      this.editedPost = null
      this.loadingEdit = false
      this.getPosts()
      this.messageService.message("Post edited successfully !", "success")
    }, err => {
      this.loadingEdit = false
      this.messageService.message("An problem occured, please check your connexion and try again", "error")
    })
  }

  deletePost(templateRef, post) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true
        this.postService.deletePost(post).subscribe(() => {
          this.messageService.message("Post deleted successfully !", "success")
          this.getPosts()
        }, err => {
          this.loading = false
          this.messageService.message("An problem occured, please check your connexion and try again", "error")
        })
      }
    });
  }

  closeEditForm() {
    this.editForm = null
    this.editedPost = null
  }



}
