import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledTableRow, StyledTableCell } from "components/ui";
import { OrderComanda } from "ts/interfaces";
import { formatTimeStamp } from "utils/dates";

interface PropsRow {
  order: OrderComanda;
}

function Row({ order }: PropsRow) {
  const [open, setOpen] = React.useState(false);

  const titleTypeFood = React.useMemo(() => {
    const typeFood = order.products.map(
      (product) =>
        product.type.toUpperCase() +
        `(${order.products.filter((p) => p.type === product.type).length})`
    );
    const uniqueTypeFood = [...new Set(typeFood)];
    return uniqueTypeFood.join(" y ");
  }, [order]);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {order.id}
        </StyledTableCell>
        <StyledTableCell>{order.state}</StyledTableCell>
        <StyledTableCell>
          {order.user.name} - {order.user.userType.name}
        </StyledTableCell>
        <StyledTableCell>{titleTypeFood}</StyledTableCell>
        <StyledTableCell>{formatTimeStamp(order.createdAt)}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Producto</StyledTableCell>
                    <StyledTableCell>Categoria Principal</StyledTableCell>
                    <StyledTableCell>Categoria Secundaria</StyledTableCell>
                    <StyledTableCell>Notas</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        {product.product.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {product.product.mainCategory.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {product.product.category.name}
                      </StyledTableCell>
                      <StyledTableCell>{product.note}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

interface Props {
  orders: OrderComanda[];
}

export default function TableOrders({ orders }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell colSpan={6} align="center">
              Ordenes
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Estatus</StyledTableCell>
            <StyledTableCell>Usuario que creo la orden</StyledTableCell>
            <StyledTableCell>Que tipos de alimentos incluye</StyledTableCell>
            <StyledTableCell>Fecha de creacion</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
