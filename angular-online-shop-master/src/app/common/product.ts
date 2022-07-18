import {Category} from "./category";

export class Product {

  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  photoUrl: string;
  featured: boolean;
  categoryId: number;
  created: Date;
  modified: Date;

}
