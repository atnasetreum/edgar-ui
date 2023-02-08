export interface History {
  id: number;
  methodName: string;
  data: { [key: string]: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserHistory;
}

interface UserHistory {
  id: number;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userType: UserTypeHistory;
}

interface UserTypeHistory {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
