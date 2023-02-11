import { Mpc } from "./main-product-categories.interfaces";

export interface Mp {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  mainProductCategory: Mpc;
}
