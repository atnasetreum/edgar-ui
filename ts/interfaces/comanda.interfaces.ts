export interface Comanda {
  id: number;
  mesa: number;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: ProductComanda[];
  orders: OrderComanda[];
  user: UserComanda;
}

interface OrderComanda {
  id: number;
  type: string;
  count: number;
  note: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product: ProductComanda;
}

interface ProductComanda {
  id: number;
  name: string;
  price?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserTypeComanda {
  id: number;
  name: string;
  price?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserComanda {
  id: number;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userType: UserTypeComanda;
}
