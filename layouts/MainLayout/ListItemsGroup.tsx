import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

interface GroupMenu {
  label: string;
  route: string;
  icon: JSX.Element;
  tooltip?: string;
  subMenu: {
    label: string;
    route: string;
    icon: JSX.Element;
    tooltip?: string;
  }[];
}

export default function ListItemsGroup({ group }: { group: GroupMenu }) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title={group?.tooltip ?? ""} placement="right">
        <ListItemButton selected={router.pathname === group.route}>
          <ListItemIcon>{group.icon}</ListItemIcon>
          <ListItemText
            primary={group.label}
            onClick={() => router.push(group.route)}
          />
          {open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )}
        </ListItemButton>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {group.subMenu.map((submenu) => (
            <Tooltip
              title={submenu?.tooltip ?? ""}
              key={submenu.label}
              placement="right"
            >
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => router.push(submenu.route)}
                selected={router.pathname === submenu.route}
              >
                <ListItemIcon>{submenu.icon}</ListItemIcon>
                <ListItemText primary={submenu.label} />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Collapse>
    </>
  );
}
