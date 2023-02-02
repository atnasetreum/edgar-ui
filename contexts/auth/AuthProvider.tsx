import { FC, useReducer, useEffect, ReactNode, useState } from "react";
import { AuthContext, authReducer } from "./";
import { UserSession } from "../../ts/interfaces";
import { AuthApi } from "../../utils/api";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setTables } from "../../store/slices";

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserSession;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const dispatchRedux = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const existApp = () => {
    dispatch({ type: "[Auth] - Logout" });
    dispatchRedux(setTables([]));
    localStorage.removeItem("token");
    if (router.pathname !== "/") {
      window.location.replace("/");
    }
  };

  const checkToken = async () => {
    setLoading(true);
    try {
      const data = await AuthApi.validateToken();
      localStorage.setItem("token", data.token);
      dispatch({ type: "[Auth] - Login", payload: data });
      setTimeout(() => setLoading(false), 2000);
      if (router.pathname === "/") {
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      existApp();
    }
  };

  const loginUser = async (
    id: number,
    password: string
  ): Promise<{
    userSession: UserSession;
    isLoggedIn: boolean;
  }> => {
    try {
      const data = await AuthApi.login({
        id,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch({ type: "[Auth] - Login", payload: data });
      return {
        userSession: data,
        isLoggedIn: true,
      };
    } catch (error) {
      return {
        userSession: {} as UserSession,
        isLoggedIn: false,
      };
    }
  };

  const logoutUser = () => {
    existApp();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </AuthContext.Provider>
  );
};
