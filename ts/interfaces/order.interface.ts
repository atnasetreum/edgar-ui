export interface Order {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: ProductElementOrder[];
  comanda: ComandaOrder;
  user: UserOrder;
}

interface ComandaOrder {
  id: number;
  mesa: number;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserOrder;
}

interface UserOrder {
  id: number;
  name: string;
  password: string;
  complete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userType: UserTypeOrder;
}

interface UserTypeOrder {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductElementOrder {
  id: number;
  type: string;
  count: number;
  note: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product: ProductProductOrder;
}

interface ProductProductOrder {
  id: number;
  name: string;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  mainCategory: UserTypeOrder;
  category: UserTypeOrder;
}
