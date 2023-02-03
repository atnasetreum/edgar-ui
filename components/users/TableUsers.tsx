import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { User } from "ts/interfaces";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { formatTimeStamp } from "utils/dates";
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  data: User[];
  editRow: (row: User) => void;
  deleteRow: (id: number) => void;
}

export default function TableUsers({ data, editRow, deleteRow }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Tipo de usuario</StyledTableCell>
            <StyledTableCell>Fecha de creacion</StyledTableCell>
            <StyledTableCell>Fecha de ultima actualizacion</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>{row.userType.name}</StyledTableCell>
              <StyledTableCell>
                {formatTimeStamp(row.createdAt)}
              </StyledTableCell>
              <StyledTableCell>
                {formatTimeStamp(row.updatedAt)}
              </StyledTableCell>
              <StyledTableCell>
                <ButtonGroup aria-label="outlined primary button group">
                  <IconButton aria-label="delete" onClick={() => editRow(row)}>
                    <Tooltip title="Editar">
                      <EditIcon color="warning" />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => deleteRow(row.id)}
                  >
                    <Tooltip title="Eliminar">
                      <DeleteIcon color="error" />
                    </Tooltip>
                  </IconButton>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
