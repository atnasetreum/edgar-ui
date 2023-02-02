import { UserType } from "./userType.interfaces";

export interface User {
  id: number;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userType: UserType;
}

export interface UserLogin {
  id: number;
  name: string;
  nameUserType: string;
}
