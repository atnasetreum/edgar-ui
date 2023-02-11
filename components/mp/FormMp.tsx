import { Button, ButtonGroup, Grid } from "@mui/material";
import InputText from "components/ui/InputText";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { IFormMP } from "@/pages/products/product-categories";
import SelectMpc from "components/ui/SelectMpc";

interface Props {
  form: IFormMP;
  setForm: (form: IFormMP) => void;
  closeForm: () => void;
  saveForm: () => void;
}

const FormMp = ({ form, setForm, closeForm, saveForm }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <InputText
          label="Nombre"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SelectMpc
          value={form.mpc}
          onChange={(mpc) => setForm({ ...form, mpc })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
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

export default FormMp;
