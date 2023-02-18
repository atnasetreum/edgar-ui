import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { ProductApi } from "utils/api";
import { Product } from "ts/interfaces";

interface Props {
  value: Product | null;
  onChange: (value: Product | null) => void;
  disabledProducts?: string[];
}

export default function AutoCompleteProducts({
  value,
  onChange,
  disabledProducts,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductApi.getAll({}).then(setProducts);
  }, []);

  return (
    <Autocomplete
      id="grouped-demo-comandas"
      options={products.sort(
        (a, b) => -b.mainCategory.name.localeCompare(a.mainCategory.name)
      )}
      getOptionDisabled={(option) =>
        disabledProducts?.includes(option.name) || false
      }
      value={value}
      onChange={(e: any, newValue: Product | null) => {
        onChange(newValue);
      }}
      groupBy={(option) => option.mainCategory.name}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Productos" autoComplete="off" fullWidth />
      )}
    />
  );
}
