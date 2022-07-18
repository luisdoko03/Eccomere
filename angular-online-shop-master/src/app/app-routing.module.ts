import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {NewCategoryComponent} from './components/new-category/new-category.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {OrderListComponent} from './components/order-list/order-list.component';
import {ClientListComponent} from './components/client-list/client-list.component';
import {NewProductComponent} from './components/new-product/new-product.component';
import {PageNotFoundComponent} from './errors/page-not-found/page-not-found.component';
import {OrderAndClientComponent} from './components/order-and-client/order-and-client.component';
import {BannerListComponent} from './components/banner-list/banner-list.component';
import {BannerComponent} from './components/banner/banner.component';
import {BlogListComponent} from './components/blog-list/blog-list.component';
import {BlogComponent} from './components/blog/blog.component';

const appRoutes: Routes = [
  {path: 'categories', component: CategoryListComponent},
  {path: 'categories/manage', component: NewCategoryComponent},
  {path: 'categories/manage/:id', component: NewCategoryComponent},
  {path: 'banners', component: BannerListComponent},
  {path: 'banners/manage/:id', component: BannerComponent},
  {path: 'banners/manage', component: BannerComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/manage', component: NewProductComponent},
  {path: 'products/manage/:id', component: NewProductComponent},
  {path: 'products/new', component: NewProductComponent},
  {path: 'orders', component: OrderListComponent},
  {path: 'orders/new', component: OrderAndClientComponent},
  {path: 'clients', component: ClientListComponent},
  {path: 'posts', component: BlogListComponent},
  {path: 'posts/manage', component: BlogComponent},
  {path: 'posts/manage/:id', component: BlogComponent},
  {path: 'not-found', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
