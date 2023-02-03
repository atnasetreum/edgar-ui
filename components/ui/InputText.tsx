import { Paper, TextField } from "@mui/material";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const InputText = ({ label, value, onChange, type }: Props) => {
  return (
    <Paper>
      <TextField
        type={type ?? "text"}
        label={label}
        variant="outlined"
        fullWidth
        autoComplete="off"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </Paper>
  );
};

export default InputText;
