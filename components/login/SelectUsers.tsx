import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { UserLogin } from "../../ts/interfaces";
import { UserApi } from "../../utils/api";
import { useNotify } from "hooks";
import { errorAxios } from "utils/api/errorAxios";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

interface Props {
  value: UserLogin | null;
  onChange: (user: UserLogin | null) => void;
}

export const SelectUsers = ({ value, onChange }: Props) => {
  const [users, setUsers] = React.useState<UserLogin[]>([]);
  const { notify } = useNotify();

  React.useEffect(() => {
    UserApi.getUsersLogin()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => errorAxios(err, notify));
  }, []);

  return (
    <Autocomplete
      id="grouped-demo"
      options={users.sort(
        (a, b) => -b.nameUserType.localeCompare(a.nameUserType)
      )}
      groupBy={(option) => option.nameUserType}
      getOptionLabel={(option) => `${option.name} - ${option.nameUserType}`}
      renderInput={(params) => <TextField {...params} label="Usuarios" />}
      renderGroup={(params) => (
        <li key={params.group}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
    />
  );
};
