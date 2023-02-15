import { Button, ButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import MainLayout from "layouts/MainLayout";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Mp, Mpc, Product } from "ts/interfaces";
import { useNotify } from "hooks";
import { errorAxios } from "utils/api/errorAxios";
import FormProducts from "components/products/FormProducts";
import FiltersProducts from "components/products/FiltersProducts";
import TableProducts from "components/products/TableProducts";
import { ProductApi } from "utils/api";

export interface IFiltersProducts {
  id: string;
  name: string;
  mainCategory: Mpc | null;
  category: Mp | null;
}

const filtersInit: IFiltersProducts = {
  id: "",
  name: "",
  mainCategory: null,
  category: null,
};

export interface IFormProducts {
  name: string;
  price: string;
  mainCategory: Mpc | null;
  category: Mp | null;
}

const formInit: IFormProducts = {
  name: "",
  price: "",
  mainCategory: null,
  category: null,
};

export default function ProductPage() {
  const [action, setAction] = useState<string>("");
  const [filters, setFilters] = useState<IFiltersProducts>(filtersInit);
  const [form, setForm] = useState<IFormProducts>(formInit);
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState<number>(0);
  const { notify } = useNotify();

  const getData = () => {
    ProductApi.getAll({
      ...(filters.id && { id: filters.id }),
      ...(filters.name && { name: filters.name }),
      ...(filters.mainCategory && { mainCategoryId: filters.mainCategory.id }),
      ...(filters.category && { categoryId: filters.category.id }),
    })
      .then(setProducts)
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
    const price = form.price.trim();

    if (!name) {
      notify("Agregue un nombre");
      return false;
    }

    if (!price) {
      notify("Agregue un precio");
      return false;
    }

    if (!form.mainCategory) {
      notify("Seleccione una categoria principal");
      return false;
    }

    if (!form.category) {
      notify("Seleccione una categoria secundaria");
      return false;
    }

    return {
      name,
      price,
      mainCategoryId: form.mainCategory.id,
      categoryId: form.category.id,
    };
  };

  const saveForm = async () => {
    const formData = await validateForm();

    if (formData) {
      if (!id) {
        // Create
        ProductApi.create(formData)
          .then(() => {
            notify("Producto creado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
          })
          .catch((err) => errorAxios(err, notify));
      } else {
        // Update
        ProductApi.update(id, formData)
          .then(() => {
            notify("Producto actualizado correctamente", "success");
            getData();
            setAction("");
            setForm(formInit);
            setId(0);
          })
          .catch((err) => errorAxios(err, notify));
      }
    }
  };

  const editRow = (row: Product) => {
    setId(row.id);
    setForm({
      name: row.name,
      price: row.price,
      mainCategory: row.mainCategory,
      category: row.category,
    });
    setAction("edit");
  };

  const deleteRow = (id: number) => {
    ProductApi.remove(id)
      .then(() => {
        notify("Producto eliminado correctamente", "success");
        getData();
      })
      .catch((err) => errorAxios(err, notify));
  };

  return (
    <MainLayout title="Productos">
      <Grid container spacing={3}>
        {["add", "edit"].includes(action) && (
          <Grid item xs={12} md={12} lg={12}>
            <FormProducts
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
              <FiltersProducts filters={filters} setFilters={setFilters} />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableProducts
                data={products}
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
