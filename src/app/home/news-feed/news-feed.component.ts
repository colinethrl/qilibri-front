import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { User } from 'src/app/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  constructor(
    private postService: PostService
  ) { }

  filteredPosts: Array<Post>;
  users: Array<User>
  form: FormGroup;

  ngOnInit(): void {
    this.postService.getPosts().subscribe((postsFromApi: any) => {
      this.filteredPosts = postsFromApi.map((postFromApi : any) => Post.apiToModel(postFromApi))
    })
    this.getUsers()
    this.form = new FormGroup({
      title: new FormControl(null),
      username: new FormControl(null),
    })
  }

  getUsers() {
    this.postService.getUsers().subscribe((usersFromApi: any) => {
      this.users = usersFromApi.map((userFromApi) => User.apiToModel(userFromApi))
    })
  }

}
