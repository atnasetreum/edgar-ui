import { Button, ButtonGroup, Grid } from "@mui/material";
import InputText from "components/ui/InputText";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { IFormProducts } from "@/pages/products";
import SelectMpc from "components/ui/SelectMpc";
import SelectPc from "components/ui/SelectPc";

interface Props {
  form: IFormProducts;
  setForm: (form: IFormProducts) => void;
  closeForm: () => void;
  saveForm: () => void;
}

const FormProducts = ({ form, setForm, closeForm, saveForm }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <InputText
          label="Nombre"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputText
          type="number"
          label="Precio"
          value={form.price}
          onChange={(price) => setForm({ ...form, price })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectMpc
          value={form.mainCategory}
          onChange={(mainCategory) => setForm({ ...form, mainCategory })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectPc
          value={form.category}
          onChange={(category) => setForm({ ...form, category })}
          resetValues={() => setForm({ ...form, category: null })}
          mainCategoryId={form.mainCategory?.id}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          fullWidth
          sx={{ mt: 1 }}
        >
          <Button
            color="error"
            startIcon={<ClearIcon />}
            onClick={() => closeForm()}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => saveForm()}
          >
            Guardar
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default FormProducts;
