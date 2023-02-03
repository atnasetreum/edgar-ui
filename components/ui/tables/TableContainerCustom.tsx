import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableFooterCustom from "components/ui/tables/TableFooterCustom";
import { StyledTableRow, StyledTableCell } from "components/ui";
import TableHeadCustom from "components/ui/tables/TableHeadCustom";
import usePagination from "hooks/usePagination";

interface Props<T> {
  rows: T[];
  columns: string[];
  renderListItem: (row: T) => JSX.Element;
}

const TableContainerCustom = <T extends object>({
  rows,
  columns,
  renderListItem,
}: Props<T>) => {
  const {
    page,
    rowsPerPage,
    emptyRows,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeadCustom columns={columns} />
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any) => renderListItem(row))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={columns.length} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooterCustom
          rows={rows}
          columns={columns}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};

export default TableContainerCustom;
