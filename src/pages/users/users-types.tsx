import { Button, ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import FiltersUsers from "components/users/FiltersUsers";
import FormUsers from "components/users/FormUsers";
import TableUsers from "components/users/TableUsers";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { User, UserType } from "ts/interfaces";
import { useNotify } from "hooks";
import { UserApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";

export interface IFiltersUsers {
  id: string;
  type: UserType | null;
}

const filtersInit: IFiltersUsers = {
  id: "",
  type: null,
};

export interface IFormUsers {
  name: string;
  type: UserType | null;
  password: string;
}

const formInit: IFormUsers = {
  name: "",
  type: null,
  password: "",
};

export default function UsersTypesPage() {
  const [action, setAction] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersUsers>(filtersInit);
  const [form, setForm] = useState<IFormUsers>(formInit);
  const [users, setUsers] = useState<User[]>([]);
  const [id, setId] = useState<number>(0);
  const { notify } = useNotify();

  const getData = () => {
    UserApi.getAll({
      ...(filters.id && { id: filters.id }),
      ...(filters.type && { typeId: filters.type.id }),
    })
      .then(setUsers)
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
    const type = form.type;
    const password = form.password.trim();

    if (!name) {
      notify("Agregue un nombre");
      return false;
    } else if (!type) {
      notify("Selecione un tipo de usuario");
      return false;
    } else if (!password && !id) {
      notify("Agregue una contraseña");
      return false;
    }

    return {
      name,
      typeId: type.id,
      ...(password && { password }),
    };
  };

  const saveForm = async () => {
    const formData = await validateForm();

    if (formData) {
      if (!id) {
        // Create
        UserApi.create(formData)
          .then(() => {
            notify("Usuario creado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
          })
          .catch((err) => errorAxios(err, notify));
      } else {
        // Update
        UserApi.update(id, formData)
          .then(() => {
            notify("Usuario creado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
            setId(0);
          })
          .catch((err) => errorAxios(err, notify));
      }
    }
  };

  const editRow = (row: User) => {
    setId(row.id);
    setForm({
      name: row.name,
      type: row.userType,
      password: "",
    });
    setAction("edit");
  };

  const deleteRow = (id: number) => {
    UserApi.remove(id)
      .then(() => {
        notify("Usuario eliminado correctamente", "success");
        getData();
      })
      .catch((err) => errorAxios(err, notify));
  };

  return (
    <MainLayout title="Tipos de usuarios">
      <Grid container spacing={3}>
        {["add", "edit"].includes(action) && (
          <Grid item xs={12} md={12} lg={12}>
            <FormUsers
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
              <FiltersUsers filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableUsers
                data={users}
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
