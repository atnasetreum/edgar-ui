import { Button, ButtonGroup, Grid } from "@mui/material";
import { IFormUsers } from "@/pages/users";
import InputText from "components/ui/InputText";
import SelectUserTypes from "components/ui/SelectUserTypes";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  form: IFormUsers;
  setForm: (form: IFormUsers) => void;
  closeForm: () => void;
  saveForm: () => void;
}

const FormUsers = ({ form, setForm, closeForm, saveForm }: Props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <InputText
          label="Nombre Completo"
          value={form.name}
          onChange={(name) => setForm({ ...form, name })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <SelectUserTypes
          value={form.type}
          onChange={(type) => setForm({ ...form, type })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <InputText
          label="Contraseña"
          value={form.password}
          onChange={(password) => setForm({ ...form, password })}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
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

export default FormUsers;
