export interface Comanda {
  id: number;
  mesa: number;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: ProductProductComanda[];
  orders: OrderComanda[];
  user: UserComanda;
}

interface ProductProductComanda {
  id: number;
  name: string;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  mainCategory: MainCategoryComanda;
  category: CategoryComanda;
}

interface MainCategoryComanda {
  id: number;
  isActive: boolean;
  createdAt: string;
  state: string;
  updatedAt: string;
  name: string;
}

interface CategoryComanda {
  id: number;
  isActive: boolean;
  createdAt: string;
  state: string;
  updatedAt: string;
  name: string;
}

interface OrderProductComanda {
  id: number;
  type: string;
  note: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product: ProductProductComanda;
}

export interface OrderComanda {
  id: number;
  isActive: boolean;
  createdAt: string;
  state: string;
  updatedAt: string;
  user: UserComanda;
  products: OrderProductComanda[];
}

interface UserTypeComanda {
  id: number;
  isActive: boolean;
  createdAt: string;
  state: string;
  updatedAt: string;
  name: string;
}

interface UserComanda {
  id: number;
  name: string;
  password: string;
  complete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userType: UserTypeComanda;
}
