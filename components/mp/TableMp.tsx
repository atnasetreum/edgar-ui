import { Mp } from "ts/interfaces";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { useState } from "react";
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formatTimeStamp } from "utils/dates";
import TableContainerCustom from "components/ui/tables/TableContainerCustom";

interface Props {
  data: Mp[];
  editRow: (row: Mp) => void;
  deleteRow: (id: number) => void;
}

export default function TableMp({ data, editRow, deleteRow }: Props) {
  const [columns] = useState([
    "ID",
    "Nombre",
    "Categoria Principal",
    "Fecha de creacion",
    "Fecha de ultima actualizacion",
    "Acciones",
  ]);

  return (
    <TableContainerCustom
      rows={data}
      columns={columns}
      renderListItem={(row) => (
        <StyledTableRow key={row.id}>
          <StyledTableCell component="th" scope="row">
            {row.id}
          </StyledTableCell>
          <StyledTableCell>{row.name}</StyledTableCell>
          <StyledTableCell>{row.mainProductCategory.name}</StyledTableCell>
          <StyledTableCell>{formatTimeStamp(row.createdAt)}</StyledTableCell>
          <StyledTableCell>{formatTimeStamp(row.updatedAt)}</StyledTableCell>
          <StyledTableCell>
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton aria-label="delete" onClick={() => editRow(row)}>
                <Tooltip title="Editar">
                  <EditIcon color="warning" />
                </Tooltip>
              </IconButton>
              <IconButton aria-label="edit" onClick={() => deleteRow(row.id)}>
                <Tooltip title="Eliminar">
                  <DeleteIcon color="error" />
                </Tooltip>
              </IconButton>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      )}
    />
  );
}
