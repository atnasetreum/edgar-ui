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
import ListItemsGroup from "./ListItemsGroup";
import { Tooltip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

interface ElemListProps {
  label: string;
  route: string;
  icon: JSX.Element;
  tooltip?: string;
}

const ElemList = (params: ElemListProps) => {
  const router = useRouter();
  return (
    <Tooltip title={params?.tooltip ?? ""} placement="right">
      <ListItemButton
        onClick={() => router.push(params.route)}
        selected={router.pathname === params.route}
      >
        <ListItemIcon>{params.icon}</ListItemIcon>
        <ListItemText primary={params.label} />
      </ListItemButton>
    </Tooltip>
  );
};

export const MainListItems = () => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext);

  const userType = React.useMemo(() => {
    return user?.userType;
  }, [user]);

  return (
    <React.Fragment>
      <ElemList label="Inicio" route="/dashboard" icon={<DashboardIcon />} />

      {userType === userTypes.ADMIN && (
        <ListItemsGroup
          group={{
            label: "Productos",
            route: "/products",
            icon: <DinnerDiningIcon />,
            subMenu: [
              {
                label: "Cat. Principales",
                route: "/products/main-product-categories",
                icon: <DinnerDiningIcon />,
                tooltip: "Categorias Principales",
              },
              {
                label: "Cat. Secundarias",
                route: "/products/product-categories",
                icon: <DinnerDiningIcon />,
                tooltip: "Categorias Secundarias",
              },
              {
                label: "Precios",
                route: "/products/product-prices",
                icon: <DinnerDiningIcon />,
              },
            ],
          }}
        />
      )}
      {userType === userTypes.ADMIN && (
        <ElemList label="Usuarios" route="/users" icon={<GroupIcon />} />
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
