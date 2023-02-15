import { Mp } from "ts/interfaces";
import { Autocomplete, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MPApi } from "utils/api";
import { useNotify } from "hooks";
import { errorAxios } from "utils/api/errorAxios";

interface Props {
  value: Mp | null;
  onChange: (value: Mp | null) => void;
  mainCategoryId: number | undefined;
  resetValues: () => void;
}

export default function SelectPc({
  value,
  onChange,
  mainCategoryId,
  resetValues,
}: Props) {
  const [mp, setMp] = useState<Mp[]>([]);
  const { notify } = useNotify();

  useEffect(() => {
    if (mainCategoryId && !mp.length) {
      MPApi.getAll({ mpcId: mainCategoryId })
        .then(setMp)
        .catch((err) => errorAxios(err, notify));
    }
  }, [mainCategoryId, notify, mp]);

  useEffect(() => {
    if (!mainCategoryId && mp.length) {
      setMp([]);
      resetValues();
    }
  }, [mainCategoryId, mp, resetValues]);

  return (
    <Paper>
      <Autocomplete
        disablePortal
        id="autocomplete-mp"
        getOptionLabel={(option) => option.name || ""}
        options={mp}
        value={value}
        onChange={(event: any, newValue: Mp | null) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categoria Secundaria"
            autoComplete="off"
            fullWidth
          />
        )}
      />
    </Paper>
  );
}
