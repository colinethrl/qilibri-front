import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/post';
import { User } from 'src/app/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  constructor(
    private postService: PostService,
    private messageService: MessageService
  ) { }

  posts: Array<Post>;
  filteredPosts: Array<Post>;
  users: Array<User>
  filteredUsers: Observable<User[]>;
  form: FormGroup;
  selectedPost: Post;
  filteredTitlePosts: Observable<Post[]>;
  loading = true;
  userId: number;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id
    this.postService.getPosts().subscribe((postsFromApi: any) => {
      this.posts = postsFromApi.map((postFromApi : any) => Post.apiToModel(postFromApi))
      this.filteredPosts = this.posts
      this.loading = false
      this.getUsers()
      this.form = new FormGroup({
        title: new FormControl(null),
        username: new FormControl(null),
      })
      this.handleUsernameChange()
      this.handleTitleChange()
    }, err => {
      this.loading = false
      this.messageService.message("An problem occured, please check your connexion and try again", "error")
    })
  }
  handleUsernameChange() {
    this.filteredUsers = this.form.controls.username.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(user => user ? this._filterUsers(user) : this.users.slice())
        );
  
    this.form.controls.username.valueChanges.subscribe((selectedUser) => {
      this.filteredPosts = selectedUser ?
        this.posts.filter((post) => post.user.id === selectedUser.id) :
        this.posts

      this.form.controls.title.setValue(null)

      this.bindTitlePosts()
    })
  }

  handleTitleChange() {
    this.bindTitlePosts()
    this.form.controls.title.valueChanges.subscribe((selectedPost) => {
      this.selectedPost = typeof selectedPost != String ? selectedPost : null
    })
  }

  bindTitlePosts() {
    this.filteredTitlePosts = this.form.controls.title.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.title),
      map(title => title ? this._filterTitles(title) : this.filteredPosts.slice())
    );
  }

  getUsers() {
    this.postService.getUsers().subscribe((usersFromApi: any) => {
      this.users = usersFromApi.map((userFromApi) => User.apiToModel(userFromApi))
    }, err => {
      this.messageService.message("An problem occured, please check your connexion and try again", "error")
    })
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterTitles(value: string): Post[] {
    const filterValue = value.toLowerCase();
    return this.filteredPosts.filter(post => post.title.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFnUser(user: User): string {
    return user && user.name ? user.name : '';
  }

  displayFnPost(post: Post): string {
    return post && post.title ? post.title : '';
  }

}
