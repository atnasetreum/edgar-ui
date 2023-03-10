import { IFiltersUsers } from "@/pages/users";
import { Grid, Paper } from "@mui/material";
import InputText from "components/ui/InputText";
import SelectUserTypes from "components/ui/SelectUserTypes";

interface Props {
  filters: IFiltersUsers;
  setFilters: (filters: IFiltersUsers) => void;
}

const FiltersUsers = ({ filters, setFilters }: Props) => {
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
          <SelectUserTypes
            value={filters.type}
            onChange={(type) => setFilters({ ...filters, type })}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FiltersUsers;
