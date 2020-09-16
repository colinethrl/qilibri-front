import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  public createPost(post) {
    let user = JSON.parse(localStorage.getItem('user'))
    return this.http.post('/api/post/' + user.id, post)
  }

  public editPost(post) {
    let user = JSON.parse(localStorage.getItem('user'))
    return this.http.post('/api/post/' + post.id + "/" + user.id, post)
  }

  public deletePost(post) {
    let user = JSON.parse(localStorage.getItem('user'))
    return this.http.delete('/api/post/' + post.id + "/" + user.id, post)
  }

  public getPosts() {
    return this.http.get('api/posts')
  }

  public getOwnPosts() {
    let user = JSON.parse(localStorage.getItem('user'))
    return this.http.get('api/posts/' + user.id)
  }

  public getUsers() {
    return this.http.get('api/users')
  }
}
