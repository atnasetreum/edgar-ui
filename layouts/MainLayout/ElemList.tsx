import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

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

export default ElemList;
