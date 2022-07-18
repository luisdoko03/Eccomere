import {Client} from "./client";
import {Product} from "./product";

export class Order {

  id: number;
  created: Date;
  modified: Date;
  finalPrice: number;
  comment: string;
  client: Client;
  product: Product;
}
