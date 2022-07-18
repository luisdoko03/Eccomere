import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../../services/upload.service";
import {BannerService} from "../../services/banner.service";
import {Category} from "../../common/category";
import {Banner} from "../../common/banner";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  bannerForm = new FormGroup({});
  public userFile: any = File;

  constructor(private bannerService: BannerService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private uploadService: UploadService) {

  }

  ngOnInit(): void {

    if (this.activeRoute.snapshot.params.id) {
      this.bannerService.getById(this.activeRoute.snapshot.params.id)
        .subscribe((banner) => {
          this.bannerForm = this.createBannerForm(banner);
        });
    } else {
      this.bannerForm = this.createBannerForm({} as Category);
    }
  }
  onSubmit() {
    debugger
    this.bannerService.save(this.bannerForm.value)
      .subscribe(response => {
        return this.router.navigate(['/banners']);
      });
  }
  createBannerForm(banner: Banner): FormGroup {
    return new FormGroup({
      id: new FormControl(banner.id),
      name: new FormControl(banner.name, Validators.required),
      photoUrl: new FormControl(banner.photoUrl, [Validators.required])
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
          this.bannerForm.patchValue({
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
