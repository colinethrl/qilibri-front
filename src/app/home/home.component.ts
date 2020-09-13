import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    let post = {
      title: "test",
      body: "body test",
      published_at: moment.now() / 1000
    }
    this.postService.getPosts().subscribe((posts) => {
      console.log(posts)
    })
    // this.postService.createPost(post).subscribe((res) => {
    //   console.log(res)
    // })
  }

}
