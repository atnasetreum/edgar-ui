import Grid from "@mui/material/Grid";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import { History, UserLogin, UserType } from "ts/interfaces";
import { useNotify } from "hooks";
import { HistoryApi } from "utils/api";
import FiltersHistories from "components/histories/FiltersHistories";
import TableHistories from "components/histories/TableHistories";
import { errorAxios } from "utils/api/errorAxios";

export interface IFiltersHistories {
  id: string;
  methodName: string | null;
  user: UserLogin | null;
}

const filtersInit: IFiltersHistories = {
  id: "",
  methodName: null,
  user: null,
};

export default function HistoriesPage() {
  const [filters, setFilters] = useState<IFiltersHistories>(filtersInit);
  const [histories, setHistories] = useState<History[]>([]);
  const { notify } = useNotify();

  const getData = () => {
    HistoryApi.getAll({
      ...(filters.id && { id: filters.id }),
      ...(filters.methodName && { methodName: filters.methodName }),
      ...(filters.user && { userId: filters.user.id }),
    })
      .then(setHistories)
      .catch((err) => errorAxios(err, notify));
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <MainLayout title="Historial">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <FiltersHistories filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TableHistories data={histories} />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
