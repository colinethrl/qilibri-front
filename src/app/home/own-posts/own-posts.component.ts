import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-own-posts',
  templateUrl: './own-posts.component.html',
  styleUrls: ['./own-posts.component.scss']
})
export class OwnPostsComponent implements OnInit {

  constructor(
    private postService: PostService,
    private messageService: MessageService
  ) { }

  posts: Array<Post>;
  addForm: FormGroup;
  minDate = new Date();
  loadingPublish = false;
  loading = true;

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
    if (!post.publishedAt) {
      return null
    } else if (post.publishedAt > moment().format('MMMM Do YYYY, h:mm a')) {
      return "to_be_published"
    } else if (post.publishedAt <= moment().format('MMMM Do YYYY, h:mm a')) {
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



}
