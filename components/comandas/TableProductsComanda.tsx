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
  deleteProduct: (type: string, name: string) => void;
  onChangeProduct: (
    type: string,
    name: string,
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
            <StyledTableCell align="center">Cantidad</StyledTableCell>
            <StyledTableCell align="center">Notas adicionales</StyledTableCell>
            <StyledTableCell align="center">Eliminar</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Paper>
                  <TextField
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                    type="number"
                    label="Cantidad"
                    variant="outlined"
                    value={row.count}
                    fullWidth
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      onChangeProduct(label, row.name, value, "count")
                    }
                  />
                </Paper>
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
                      onChangeProduct(label, row.name, value, "note")
                    }
                  />
                </Paper>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  color="error"
                  aria-label="upload picture"
                  component="label"
                  onClick={() => deleteProduct(label, row.name)}
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
