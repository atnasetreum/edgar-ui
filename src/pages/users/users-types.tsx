import { Button, ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import FiltersUsers from "components/users/FiltersUsers";
import FormUsers from "components/users/FormUsers";
import TableUsers from "components/users/TableUsers";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { UserType } from "ts/interfaces";
import { useNotify } from "hooks";
import { UserTypeApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";
import FormUserTypes from "components/userTypes/FormUserTypes";
import FiltersUserTypes from "components/userTypes/FiltersUserTypes";
import TableUserTypes from "components/userTypes/TableUserTypes";

export interface IFiltersUserTypes {
  id: string;
}

const filtersInit: IFiltersUserTypes = {
  id: "",
};

export interface IFormUserTypes {
  name: string;
}

const formInit: IFormUserTypes = {
  name: "",
};

export default function UsersTypesPage() {
  const [action, setAction] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersUserTypes>(filtersInit);
  const [form, setForm] = useState<IFormUserTypes>(formInit);
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [id, setId] = useState<number>(0);
  const { notify } = useNotify();

  const getData = () => {
    UserTypeApi.getAll({
      ...(filters.id && { id: filters.id }),
    })
      .then(setUserTypes)
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
        UserTypeApi.create(formData)
          .then(() => {
            notify("Tipo de usuario creado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
          })
          .catch((err) => errorAxios(err, notify));
      } else {
        // Update
        UserTypeApi.update(id, formData)
          .then(() => {
            notify("Tipo de usuario actualizado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
            setId(0);
          })
          .catch((err) => errorAxios(err, notify));
      }
    }
  };

  const editRow = (row: UserType) => {
    setId(row.id);
    setForm({
      name: row.name,
    });
    setAction("edit");
  };

  const deleteRow = (id: number) => {
    UserTypeApi.remove(id)
      .then(() => {
        notify("Tipo de usuario eliminado correctamente", "success");
        getData();
      })
      .catch((err) => errorAxios(err, notify));
  };

  return (
    <MainLayout title="Tipos de usuarios">
      <Grid container spacing={3}>
        {["add", "edit"].includes(action) && (
          <Grid item xs={12} md={12} lg={12}>
            <FormUserTypes
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
              <FiltersUserTypes filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableUserTypes
                data={userTypes}
                editRow={editRow}
                deleteRow={deleteRow}
              />
            </Grid>
          </>
        )}
      </Grid>
    </MainLayout>
  );
}
