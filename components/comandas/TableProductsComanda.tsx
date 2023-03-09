import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { BebidaOrComida } from "@/pages/comandas";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  label: string;
  data: BebidaOrComida[];
  deleteProduct: (type: string, idx: number) => void;
  onChangeProduct: (
    type: string,
    idx: number,
    value: string,
    key: string
  ) => void;
}

export default function TableProductsComanda({
  label,
  data,
  deleteProduct,
  onChangeProduct,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell colSpan={5} align="center">
              {label}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Notas adicionales</StyledTableCell>
            <StyledTableCell align="center">Eliminar</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Paper>
                  <TextField
                    label="Notas"
                    multiline
                    rows={4}
                    value={row.note}
                    fullWidth
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      onChangeProduct(label, idx, value, "note")
                    }
                  />
                </Paper>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  color="error"
                  aria-label="upload picture"
                  component="label"
                  onClick={() => deleteProduct(label, idx)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
