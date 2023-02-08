import { Button, ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Mpc } from "ts/interfaces";
import { useNotify } from "hooks";
import { MPCApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";
import FormMpc from "components/mpc/FormMpc";
import FiltersMpc from "components/mpc/FiltersMpc";
import TableMpc from "components/mpc/TableMpc";

export interface IFiltersMPC {
  id: string;
  name: string;
}

const filtersInit: IFiltersMPC = {
  id: "",
  name: "",
};

export interface IFormMPC {
  name: string;
}

const formInit: IFormMPC = {
  name: "",
};

export default function MainProductCategoriesPage() {
  const [action, setAction] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersMPC>(filtersInit);
  const [form, setForm] = useState<IFormMPC>(formInit);
  const [mpc, setMpc] = useState<Mpc[]>([]);
  const [id, setId] = useState<number>(0);
  const { notify } = useNotify();

  const getData = () => {
    MPCApi.getAll({
      ...(filters.id && { id: filters.id }),
      ...(filters.name && { name: filters.name }),
    })
      .then(setMpc)
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

    return {
      name,
    };
  };

  const saveForm = async () => {
    const formData = await validateForm();

    if (formData) {
      if (!id) {
        // Create
        MPCApi.create(formData)
          .then(() => {
            notify("Categoria principal creada correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
          })
          .catch((err) => errorAxios(err, notify));
      } else {
        // Update
        MPCApi.update(id, formData)
          .then(() => {
            notify("Categoria principal actualizada correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
            setId(0);
          })
          .catch((err) => errorAxios(err, notify));
      }
    }
  };

  const editRow = (row: Mpc) => {
    setId(row.id);
    setForm({
      name: row.name,
    });
    setAction("edit");
  };

  const deleteRow = (id: number) => {
    MPCApi.remove(id)
      .then(() => {
        notify("Categoria principal eliminada correctamente", "success");
        getData();
      })
      .catch((err) => errorAxios(err, notify));
  };

  return (
    <MainLayout title="Categorias Principales">
      <Grid container spacing={3}>
        {["add", "edit"].includes(action) && (
          <Grid item xs={12} md={12} lg={12}>
            <FormMpc
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
              <FiltersMpc filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableMpc data={mpc} editRow={editRow} deleteRow={deleteRow} />
            </Grid>
          </>
        )}
      </Grid>
    </MainLayout>
  );
}
