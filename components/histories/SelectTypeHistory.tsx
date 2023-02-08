import { UserType } from "ts/interfaces";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { UserTypeApi } from "utils/api";
import { useNotify } from "hooks";

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function SelectTypeHistory({ value, onChange }: Props) {
  return (
    <Paper>
      <Autocomplete
        disablePortal
        id="autocomplete-types-history"
        options={["Creacion", "Actualizacion", "Eliminacion"]}
        value={value}
        onChange={(event: any, newValue: string | null) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipos de acciones"
            autoComplete="off"
            fullWidth
          />
        )}
      />
    </Paper>
  );
}
