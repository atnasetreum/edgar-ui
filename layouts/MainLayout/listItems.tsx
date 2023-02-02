import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AuthContext } from "../../contexts/auth";
import { userTypes } from "../../constants";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AssessmentIcon from "@mui/icons-material/Assessment";

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
          onClick={() => router.push("/sellers")}
          selected={router.pathname === "/sellers"}
        >
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Sellers" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/rutas")}
          selected={router.pathname === "/rutas"}
        >
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Rutas" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/camionetas")}
          selected={router.pathname === "/camionetas"}
        >
          <ListItemIcon>
            <DirectionsCarIcon />
          </ListItemIcon>
          <ListItemText primary="Camionetas" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/logisticas")}
          selected={router.pathname === "/logisticas"}
        >
          <ListItemIcon>
            <LocationCityIcon />
          </ListItemIcon>
          <ListItemText primary="Logisticas" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/reportes")}
          selected={router.pathname === "/reportes"}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItemButton>
      )}
      {userType === userTypes.ADMIN && (
        <ListItemButton
          onClick={() => router.push("/users")}
          selected={router.pathname === "/users"}
        >
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
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
