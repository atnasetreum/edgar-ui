import { UserType } from "ts/interfaces";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserTypeApi } from "utils/api";
import { useNotify } from "hooks";
import { errorAxios } from "utils/api/errorAxios";

interface Props {
  value: UserType | null;
  onChange: (value: UserType | null) => void;
}

export default function SelectUserTypes({ value, onChange }: Props) {
  const [types, setTypes] = useState<UserType[]>([]);
  const { notify } = useNotify();

  useEffect(() => {
    UserTypeApi.getAll()
      .then(setTypes)
      .catch((err) => errorAxios(err, notify));
  }, []);

  return (
    <Paper>
      <Autocomplete
        disablePortal
        id="autocomplete-user-types"
        getOptionLabel={(option) => option.name || ""}
        options={types}
        value={value}
        onChange={(event: any, newValue: UserType | null) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipos de usuario"
            autoComplete="off"
            fullWidth
          />
        )}
      />
    </Paper>
  );
}
