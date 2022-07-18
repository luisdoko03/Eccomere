import { Component, OnInit } from '@angular/core';
import {Category} from '../../common/category';
import {CategoryService} from '../../services/category.service';
import {Router} from '@angular/router';
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.listCategories();
  }


  listCategories(): void{
    this.categoryService.getCategoryList().subscribe(data => {
      this.categories = data;
    });
  }
  updateCategory(): void {
    this.categoryService.getCategoryList().subscribe(response => {
      this.categories = response;
    });
  }

  onDeleteCategory(id: number): void {
    const shouldDelete = confirm('Are you sure you want to delete it?');
    if (shouldDelete) {
      this.categoryService.delete(id).subscribe(response => {
        this.updateCategory();
      });
    }
  }

}
