import { Mpc } from "ts/interfaces";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MPCApi } from "utils/api";
import { useNotify } from "hooks";
import { errorAxios } from "utils/api/errorAxios";

interface Props {
  value: Mpc | null;
  onChange: (value: Mpc | null) => void;
}

export default function SelectMpc({ value, onChange }: Props) {
  const [types, setTypes] = useState<Mpc[]>([]);
  const { notify } = useNotify();

  useEffect(() => {
    MPCApi.getAll({})
      .then(setTypes)
      .catch((err) => errorAxios(err, notify));
  }, []);

  return (
    <Paper>
      <Autocomplete
        disablePortal
        id="autocomplete-mpc"
        getOptionLabel={(option) => option.name || ""}
        options={types}
        value={value}
        onChange={(event: any, newValue: Mpc | null) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categoria Principal"
            autoComplete="off"
            fullWidth
          />
        )}
      />
    </Paper>
  );
}
