import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FormComanda } from "@/pages/comandas";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import DialogContent from "@mui/material/DialogContent";
import { Grid, Paper } from "@mui/material";
import AutoCompleteProducts from "./AutoCompleteProducts";
import TableProductsComanda from "./TableProductsComanda";
import { useState, useEffect } from "react";
import { Comanda, Product } from "ts/interfaces";
import { mainCategoriesContants } from "../../constants";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  tableSelected: number;
  form: FormComanda;
  setForm: (form: FormComanda) => void;
  createComanda: () => void;
  comandaCurrent: Comanda | null;
}

export default function ModalComanda({
  isOpen,
  closeModal,
  tableSelected,
  form,
  setForm,
  createComanda,
  comandaCurrent,
}: Props) {
  const [product, setProduct] = useState<Product | null>(null);

  const handleClose = (confirm?: string) => {
    if (confirm) {
      createComanda();
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    if (product) {
      const {
        mainCategory: { name: group },
      } = product;
      switch (group) {
        case mainCategoriesContants.COMIDAS:
          setForm({
            ...form,
            comida: [
              ...form.comida,
              {
                productId: product.id,
                name: product.name,
                count: "1",
                note: "",
              },
            ],
          });
          break;
        case mainCategoriesContants.BEBIDAS:
          setForm({
            ...form,
            bebida: [
              ...form.bebida,
              {
                productId: product.id,
                name: product.name,
                count: "1",
                note: "",
              },
            ],
          });
          break;
      }
      setTimeout(() => {
        setProduct(null);
      }, 50);
    }
  }, [product]);

  const disabledProducts = React.useMemo(() => {
    return [
      ...form.bebida.map((row) => row.name),
      ...form.comida.map((row) => row.name),
    ];
  }, [form.bebida, form.comida]);

  const deleteProduct = (type: string, name: string) => {
    switch (type) {
      case mainCategoriesContants.COMIDAS:
        setForm({
          ...form,
          comida: [...form.comida.filter((row) => row.name !== name)],
        });
        break;
      case mainCategoriesContants.BEBIDAS:
        setForm({
          ...form,
          bebida: [...form.bebida.filter((row) => row.name !== name)],
        });
        break;
    }
  };

  const onChangeProduct = (
    type: string,
    name: string,
    value: string,
    key: string
  ) => {
    switch (type) {
      case mainCategoriesContants.COMIDAS:
        const comidaClone = [...form.comida];
        const idxComida = comidaClone.findIndex((row) => row.name === name);
        if (idxComida !== -1) {
          comidaClone[idxComida] = {
            ...comidaClone[idxComida],
            [key]: value,
          };
        }
        setForm({
          ...form,
          comida: comidaClone,
        });
        break;
      case mainCategoriesContants.BEBIDAS:
        const bebidaClone = [...form.bebida];
        const idxBebida = bebidaClone.findIndex((row) => row.name === name);
        if (idxBebida !== -1) {
          bebidaClone[idxBebida] = {
            ...bebidaClone[idxBebida],
            [key]: value,
          };
        }
        setForm({
          ...form,
          bebida: bebidaClone,
        });
        break;
    }
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={() => handleClose()}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Mesa {tableSelected}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => handleClose("ok")}
            startIcon={<TableRestaurantIcon />}
          >
            Crear Comanda
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper>
              <AutoCompleteProducts
                value={product}
                onChange={(prod) => setProduct(prod)}
                disabledProducts={disabledProducts}
              />
            </Paper>
          </Grid>
          {!!form.bebida.length && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper>
                <TableProductsComanda
                  label={mainCategoriesContants.BEBIDAS}
                  data={form.bebida}
                  deleteProduct={deleteProduct}
                  onChangeProduct={onChangeProduct}
                />
              </Paper>
            </Grid>
          )}
          {!!form.comida.length && (
            <Grid item xs={12} md={6} lg={6}>
              <Paper>
                <TableProductsComanda
                  label={mainCategoriesContants.COMIDAS}
                  data={form.comida}
                  deleteProduct={deleteProduct}
                  onChangeProduct={onChangeProduct}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
