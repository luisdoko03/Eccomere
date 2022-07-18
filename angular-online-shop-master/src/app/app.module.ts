import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {CategoryService} from './services/category.service';
import {OrderService} from './services/order.service';
import {ClientService} from './services/client.service';
import {ClientListComponent} from './components/client-list/client-list.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {NewCategoryComponent} from './components/new-category/new-category.component';
import {NewProductComponent} from './components/new-product/new-product.component';
import {PageNotFoundComponent} from './errors/page-not-found/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {OrderAndClientComponent} from "./components/order-and-client/order-and-client.component";
import { BannerComponent } from './components/banner/banner.component';
import { BannerListComponent } from './components/banner-list/banner-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    ClientListComponent,
    OrderListComponent,
    NewCategoryComponent,
    NewProductComponent,
    PageNotFoundComponent,
    OrderAndClientComponent,
    BannerComponent,
    BannerListComponent,
    BlogComponent,
    BlogListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService,
    CategoryService,
    ClientService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
