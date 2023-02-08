import { History } from "ts/interfaces";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { useState } from "react";
import { formatTimeStamp } from "utils/dates";
import TableContainerCustom from "components/ui/tables/TableContainerCustom";

interface Props {
  data: History[];
}

export default function TableHistories({ data }: Props) {
  const [columns] = useState([
    "ID",
    "Usuario",
    "Tipo de usuario",
    "Tipo de accion",
    "Referencia",
    "Fecha de accion",
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
          <StyledTableCell>{row.user.name}</StyledTableCell>
          <StyledTableCell>{row.user.userType.name}</StyledTableCell>
          <StyledTableCell>{row.methodName}</StyledTableCell>
          <StyledTableCell>{row.data.message}</StyledTableCell>
          <StyledTableCell>{formatTimeStamp(row.createdAt)}</StyledTableCell>
        </StyledTableRow>
      )}
    />
  );
}
