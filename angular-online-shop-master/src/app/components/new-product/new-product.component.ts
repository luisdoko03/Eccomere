import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../common/product";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../common/category";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm = new FormGroup({});
  categoryList: Category[];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.listCategory();
    if (this.activeRoute.snapshot.params.id) {
      this.productService.getById(this.activeRoute.snapshot.params.id)
        .subscribe((product) => {
          this.productForm = this.createProductForm(product);
        });
    } else {
      this.productForm = this.createProductForm({} as Product);
    }

  }

  onSubmit() {
    this.productService.save(this.productForm.value)
      .subscribe(response => {
        return this.router.navigate(['/products']);
      });
  }

  createProductForm(product: Product): FormGroup {
    return new FormGroup({
      id: new FormControl(product.id),
      title: new FormControl(product.title, Validators.required),
      photoUrl: new FormControl(product.photoUrl, Validators.required),
      price: new FormControl(product.price, Validators.min(1)),
      quantity: new FormControl(product.quantity, [Validators.min(0), Validators.required]),
      featured: new FormControl(product.featured),
      categoryId: new FormControl(product.categoryId, [Validators.required]),
      description: new FormControl(product.description),
    });

  }

  listCategory() {
    this.categoryService.getCategoryList().subscribe(data => {
      this.categoryList = data;
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
          this.productForm.patchValue({
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
