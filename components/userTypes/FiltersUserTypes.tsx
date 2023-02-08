import { IFiltersUserTypes } from "@/pages/users/users-types";
import { Grid, Paper } from "@mui/material";
import InputText from "components/ui/InputText";

interface Props {
  filters: IFiltersUserTypes;
  setFilters: (filters: IFiltersUserTypes) => void;
}

const FiltersUserTypes = ({ filters, setFilters }: Props) => {
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
    </Grid>
  );
};

export default FiltersUserTypes;
