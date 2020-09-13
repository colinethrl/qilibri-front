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
    return this.http.post('/api/post', post)
  }

  public getPosts() {
    return this.http.get('api/posts')
  }
}
