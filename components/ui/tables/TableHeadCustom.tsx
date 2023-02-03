import { TableHead } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./TableStyle";

interface Props {
  columns: string[];
}

const TableHeadCustom = ({ columns }: Props) => {
  return (
    <TableHead>
      <StyledTableRow>
        {columns.map((column) => (
          <StyledTableCell key={column}>{column}</StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
};

export default TableHeadCustom;
