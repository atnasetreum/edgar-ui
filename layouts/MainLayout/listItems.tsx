import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/auth";
import { userTypes } from "../../constants";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import ListItemsGroup from "./ListItemsGroup";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ElemList from "./ElemList";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

export const MainListItems = () => {
  const { user } = React.useContext(AuthContext);

  const userType = React.useMemo(() => {
    return user?.userType;
  }, [user]);

  return (
    <React.Fragment>
      <ElemList label="Inicio" route="/dashboard" icon={<DashboardIcon />} />
      {userType === userTypes.ADMIN && (
        <>
          <ListItemsGroup
            group={{
              label: "Productos",
              route: "/products",
              icon: <DinnerDiningIcon />,
              subMenu: [
                {
                  label: "Cat. Principales",
                  route: "/products/main-product-categories",
                  icon: <MenuBookIcon />,
                  tooltip: "Categorias Principales",
                },
                {
                  label: "Cat. Secundarias",
                  route: "/products/product-categories",
                  icon: <AutoStoriesIcon />,
                  tooltip: "Categorias Secundarias",
                },
                {
                  label: "Precios",
                  route: "/products/product-prices",
                  icon: <PriceChangeIcon />,
                },
              ],
            }}
          />
          <ListItemsGroup
            group={{
              label: "Usuarios",
              route: "/users",
              icon: <AccountCircleIcon />,
              subMenu: [
                {
                  label: "Tipos de usuarios",
                  route: "/users/users-types",
                  icon: <SupervisedUserCircleIcon />,
                },
              ],
            }}
          />
        </>
      )}
      <ElemList label="Historial" route="/histories" icon={<HistoryIcon />} />
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
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
