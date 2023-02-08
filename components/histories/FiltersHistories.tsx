import { IFiltersHistories } from "@/pages/histories";
import { Grid, Paper } from "@mui/material";
import InputText from "components/ui/InputText";
import SelectTypeHistory from "./SelectTypeHistory";
import { SelectUsers } from "../login/SelectUsers";
import { userTypes } from "../../constants";

interface Props {
  filters: IFiltersHistories;
  setFilters: (filters: IFiltersHistories) => void;
  userType: string | undefined;
}

const FiltersHistories = ({ filters, setFilters, userType }: Props) => {
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
        <SelectTypeHistory
          value={filters.methodName}
          onChange={(methodName) => setFilters({ ...filters, methodName })}
        />
      </Grid>
      {userType === userTypes.ADMIN && (
        <Grid item xs={12} md={6} lg={3}>
          <Paper>
            <SelectUsers
              value={filters.user}
              onChange={(user) => setFilters({ ...filters, user })}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default FiltersHistories;
