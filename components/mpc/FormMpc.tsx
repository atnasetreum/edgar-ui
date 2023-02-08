import { Button, ButtonGroup, Grid } from "@mui/material";
import InputText from "components/ui/InputText";
import SelectUserTypes from "components/ui/SelectUserTypes";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { IFormMPC } from "@/pages/products/main-product-categories";

interface Props {
  form: IFormMPC;
  setForm: (form: IFormMPC) => void;
  closeForm: () => void;
  saveForm: () => void;
}

const FormMpc = ({ form, setForm, closeForm, saveForm }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <InputText
          label="Nombre"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
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

export default FormMpc;
