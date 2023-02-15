import { IFiltersProducts } from "@/pages/products";
import { Grid, Paper } from "@mui/material";
import InputText from "components/ui/InputText";
import SelectMpc from "components/ui/SelectMpc";
import SelectPc from "components/ui/SelectPc";

interface Props {
  filters: IFiltersProducts;
  setFilters: (filters: IFiltersProducts) => void;
}

const FiltersProducts = ({ filters, setFilters }: Props) => {
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
      <Grid item xs={12} md={6} lg={3}>
        <SelectMpc
          value={filters.mainCategory}
          onChange={(mainCategory) => setFilters({ ...filters, mainCategory })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectPc
          value={filters.category}
          onChange={(category) => setFilters({ ...filters, category })}
          resetValues={() => setFilters({ ...filters, category: null })}
          mainCategoryId={filters.mainCategory?.id}
        />
      </Grid>
    </Grid>
  );
};

export default FiltersProducts;
