import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../common/post';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.updatePosts();
  }

  updatePosts(): void {
    this.postService.getBlogList().subscribe(response => {
      this.posts = response;
    });
  }

  onDeletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.updatePosts();
    });
  }
}
