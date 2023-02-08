import { IFiltersMPC } from "@/pages/products/main-product-categories";
import { Grid, Paper } from "@mui/material";
import InputText from "components/ui/InputText";

interface Props {
  filters: IFiltersMPC;
  setFilters: (filters: IFiltersMPC) => void;
}

const FiltersMpc = ({ filters, setFilters }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <InputText
            type="number"
            label="ID"
            value={filters.id}
            onChange={(id) => setFilters({ ...filters, id })}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <InputText
            label="Nombre"
            value={filters.name}
            onChange={(name) => setFilters({ ...filters, name })}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FiltersMpc;
