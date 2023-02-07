import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/auth";
import { userTypes } from "../../constants";
import GroupIcon from "@mui/icons-material/Group";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

export const MainListItems = () => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext);

  const userType = React.useMemo(() => {
    return user?.userType;
  }, [user]);

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => router.push("/dashboard")}
        selected={router.pathname === "/dashboard"}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/users")}
          selected={router.pathname === "/users"}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/products")}
          selected={router.pathname === "/products"}
        >
          <ListItemIcon>
            <DinnerDiningIcon />
          </ListItemIcon>
          <ListItemText primary="Productos" />
        </ListItemButton>
      )}
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const router = useRouter();
  const { logoutUser } = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <ListItemButton onClick={() => logoutUser()}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </React.Fragment>
  );
};
