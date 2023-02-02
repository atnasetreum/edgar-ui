import { createContext } from "react";
import { UserSession } from "../../ts/interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserSession;
  loginUser: (
    id: number,
    password: string
  ) => Promise<{
    userSession: UserSession;
    isLoggedIn: boolean;
  }>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
