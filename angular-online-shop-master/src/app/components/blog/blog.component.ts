import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../common/post';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadService} from '../../services/upload.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogForm = new FormGroup({});

  constructor(private blogService: PostService,
              private uploadService: UploadService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.blogService.getById(this.activeRoute.snapshot.params.id)
        .subscribe((blog) => {
          this.blogForm = this.createBlogForm(blog);
        });
    } else {
      this.blogForm = this.createBlogForm({} as Post);
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.blogService.save(this.blogForm.value)
      .subscribe(response => {
        return this.router.navigate(['/posts']);
      });
  }

  createBlogForm(blog: Post): FormGroup {
    return new FormGroup({
      id: new FormControl(blog.id),
      title: new FormControl(blog.title, Validators.required),
      author: new FormControl(blog.author, [Validators.required]),
      photo: new FormControl(blog.author, [Validators.required]),
      content: new FormControl(blog.content, [Validators.required])
    });
  }

  onFileChange(event: any): void {
    const file: File | null = event.target.files.item(0);
    if (!file) {
      return;
    }

    this.uploadService.upload(file).subscribe(
      (httpEvent: any) => {
        if (httpEvent.type === HttpEventType.UploadProgress) {
          console.log(Math.round(100 * event.loaded / event.total));
        } else if (httpEvent instanceof HttpResponse) {
          this.blogForm.patchValue({
            photo: file.name,
          });
        }
      },
      (err: any) => {
        alert('Error uploading file');
      });
  }
}
