import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { Comanda } from "ts/interfaces";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Props {
  comandaCurrent: Comanda;
}

export default function DetallesTableComida({ comandaCurrent }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Notas</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {/* {comandaCurrent.orders
            .filter(({ type }) => type === "comida")
            .map((comida) => (
              <TableRow
                key={comida.product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {comida.product.name}
                </StyledTableCell>
                <StyledTableCell>{comida.count}</StyledTableCell>
                <StyledTableCell>{comida.note}</StyledTableCell>
              </TableRow>
            ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
