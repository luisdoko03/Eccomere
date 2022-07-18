import { Component, OnInit } from '@angular/core';
import {Category} from "../../common/category";
import {CategoryService} from "../../services/category.service";
import {UploadService} from "../../services/upload.service";
import {Banner} from "../../common/banner";
import {BannerService} from "../../services/banner.service";

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

  banners: Banner[] = [];

  constructor(private bannerService: BannerService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.listBanners();
  }


  listBanners(): void{
    this.bannerService.getBannerList().subscribe(data => {
      this.banners = data;
    });
  }
  updateBanner(): void {
    this.bannerService.getBannerList().subscribe(response => {
      this.banners = response;
    });
  }

  onDeleteBanner(id: number): void {
    const shouldDelete = confirm('Are you sure you want to delete it?');
    if (shouldDelete) {
      this.bannerService.delete(id).subscribe(response => {
        this.updateBanner();
      });
    }
  }

}
