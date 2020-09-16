import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tab = "own_posts";
  componentName = "home"
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    
  }

}
