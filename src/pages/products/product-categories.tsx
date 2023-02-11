import { Button, ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Mp, Mpc } from "ts/interfaces";
import { useNotify } from "hooks";
import { MPApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";
import FiltersMp from "components/mp/FiltersMp";
import TableMp from "components/mp/TableMp";
import FormMp from "components/mp/FormMp";

export interface IFiltersMP {
  id: string;
  name: string;
  mpc: Mpc | null;
}

const filtersInit: IFiltersMP = {
  id: "",
  name: "",
  mpc: null,
};

export interface IFormMP {
  name: string;
  mpc: Mpc | null;
}

const formInit: IFormMP = {
  name: "",
  mpc: null,
};

export default function ProductCategoriesPage() {
  const [action, setAction] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersMP>(filtersInit);
  const [form, setForm] = useState<IFormMP>(formInit);
  const [mp, setMp] = useState<Mp[]>([]);
  const [id, setId] = useState<number>(0);
  const { notify } = useNotify();

  const getData = () => {
    MPApi.getAll({
      ...(filters.id && { id: filters.id }),
      ...(filters.name && { name: filters.name }),
      ...(filters.mpc && { mpcId: filters.mpc.id }),
    })
      .then(setMp)
      .catch((err) => errorAxios(err, notify));
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const closeForm = () => {
    setAction("");
    setForm(formInit);
  };

  const validateForm = async () => {
    const name = form.name.trim();

    if (!name) {
      notify("Agregue un nombre");
      return false;
    }
    if (!form.mpc) {
      notify("Seleccione una categoria principal");
      return false;
    }

    return {
      name,
      mpcId: form.mpc.id,
    };
  };

  const saveForm = async () => {
    const formData = await validateForm();

    if (formData) {
      if (!id) {
        // Create
        MPApi.create(formData)
          .then(() => {
            notify("Categoria Secundaria creada correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
          })
          .catch((err) => errorAxios(err, notify));
      } else {
        // Update
        MPApi.update(id, formData)
          .then(() => {
            notify("Categoria Secundaria actualizada correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
            setId(0);
          })
          .catch((err) => errorAxios(err, notify));
      }
    }
  };

  const editRow = (row: Mp) => {
    setId(row.id);
    setForm({
      name: row.name,
      mpc: row.mainProductCategory,
    });
    setAction("edit");
  };

  const deleteRow = (id: number) => {
    MPApi.remove(id)
      .then(() => {
        notify("Categoria Secundaria eliminada correctamente", "success");
        getData();
      })
      .catch((err) => errorAxios(err, notify));
  };

  return (
    <MainLayout title="Categorias Secundarias">
      <Grid container spacing={3}>
        {["add", "edit"].includes(action) && (
          <Grid item xs={12} md={12} lg={12}>
            <FormMp
              form={form}
              setForm={setForm}
              closeForm={closeForm}
              saveForm={saveForm}
            />
          </Grid>
        )}
        {action === "" && (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setAction("add")}
                >
                  Agregar
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FiltersMp filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableMp data={mp} editRow={editRow} deleteRow={deleteRow} />
            </Grid>
          </>
        )}
      </Grid>
    </MainLayout>
  );
}
