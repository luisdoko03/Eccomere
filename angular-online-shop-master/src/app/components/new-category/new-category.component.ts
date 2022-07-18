import { Component, OnInit } from '@angular/core';
import {Category} from "../../common/category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryForm = new FormGroup({});
  public userFile: any = File;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private uploadService: UploadService) {

  }

  ngOnInit(): void {

    if (this.activeRoute.snapshot.params.id) {
      this.categoryService.getById(this.activeRoute.snapshot.params.id)
        .subscribe((category) => {
          this.categoryForm = this.createCategoryForm(category);
        });
    } else {
      this.categoryForm = this.createCategoryForm({} as Category);
    }
  }
  onSubmit() {
    debugger
    this.categoryService.save(this.categoryForm.value)
      .subscribe(response => {
        return this.router.navigate(['/categories']);
      });
  }

  createCategoryForm(category: Category): FormGroup {
    return new FormGroup({
      id: new FormControl(category.id),
      name: new FormControl(category.name, Validators.required),
      photoUrl: new FormControl(category.photoUrl, [Validators.required])
    });

  }
  onFileChange(event: any): void {
    debugger
    const file: File | null = event.target.files.item(0);
    if (!file) {
      return;
    }

    this.uploadService.upload(file).subscribe(
      (httpEvent: any) => {
        if (httpEvent.type === HttpEventType.UploadProgress) {
          console.log(Math.round(100 * event.loaded / event.total));
        } else if (httpEvent instanceof HttpResponse) {
          this.categoryForm.patchValue({
            photoUrl: file.name,
          });
        }
      },
      (err: any) => {
        console.log(err);
        alert('Error uploading file');
      });
  }

}
