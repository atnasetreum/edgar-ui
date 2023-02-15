import { Mpc } from "./main-product-categories.interfaces";
import { Mp } from "./product-categories.interfaces";

export interface Product {
  id: number;
  name: string;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  mainCategory: Mpc;
  category: Mp;
}
