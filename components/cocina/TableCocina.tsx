// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { StyledTableRow, StyledTableCell } from "components/ui";
// import { Order } from "ts/interfaces";
// import { Button } from "@mui/material";
// import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
// import { formatTimeStamp } from "utils/dates";

// interface Props {
//   orders: Order[];
//   setIsOpen: (isOpen: boolean) => void;
//   setOrderCurrent: (orders: Order) => void;
// }

// export default function TableCocina({
//   orders,
//   setIsOpen,
//   setOrderCurrent,
// }: Props) {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <StyledTableRow>
//             <StyledTableCell align="center">Mesa</StyledTableCell>
//             <StyledTableCell align="center">Total de alimentos</StyledTableCell>
//             <StyledTableCell>Responsable de la comanda</StyledTableCell>
//             <StyledTableCell>Quien creo la orden</StyledTableCell>
//             <StyledTableCell>Fecha de creacion</StyledTableCell>
//             <StyledTableCell>Acciones</StyledTableCell>
//           </StyledTableRow>
//         </TableHead>
//         <TableBody>
//           {orders.map((order) => (
//             <TableRow
//               key={order.id}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <StyledTableCell component="th" scope="row" align="center">
//                 {order.comanda.mesa}
//               </StyledTableCell>
//               <StyledTableCell align="center">
//                 {
//                   order.products.filter((product) => product.type === "comida")
//                     .length
//                 }
//               </StyledTableCell>
//               <StyledTableCell>
//                 {order.user.name} - {order.comanda.user.userType.name}
//               </StyledTableCell>
//               <StyledTableCell>
//                 {order.user.name} - {order.user.userType.name}
//               </StyledTableCell>
//               <StyledTableCell>
//                 {formatTimeStamp(order.createdAt)}
//               </StyledTableCell>
//               <StyledTableCell>
//                 <Button
//                   color="warning"
//                   startIcon={<PrivacyTipIcon />}
//                   fullWidth
//                   variant="contained"
//                   onClick={() => {
//                     setIsOpen(true);
//                     setOrderCurrent(order);
//                   }}
//                 >
//                   Detalles
//                 </Button>
//               </StyledTableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

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
import { formatTimeStamp } from "utils/dates";
import { Order } from "ts/interfaces";

interface PropsRow {
  order: Order;
  setIsOpen: (isOpen: boolean) => void;
  setOrderCurrent: (orders: Order) => void;
}

function Row({ order, setIsOpen, setOrderCurrent }: PropsRow) {
  const [open, setOpen] = React.useState(false);

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
        <StyledTableCell component="th" scope="row" align="center">
          {order.comanda.mesa}
        </StyledTableCell>
        <StyledTableCell align="center">
          {order.products.filter((product) => product.type === "comida").length}
        </StyledTableCell>
        <StyledTableCell>
          {order.user.name} - {order.comanda.user.userType.name}
        </StyledTableCell>
        <StyledTableCell>
          {order.user.name} - {order.user.userType.name}
        </StyledTableCell>
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
                    <StyledTableCell>Categoria</StyledTableCell>
                    <StyledTableCell>Cantidad</StyledTableCell>
                    <StyledTableCell>Nota</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {order.products
                    .filter((product) => product.type === "comida")
                    .map((product) => (
                      <StyledTableRow key={product.id}>
                        <StyledTableCell component="th" scope="row">
                          {product.product.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {product.product.category.name}
                        </StyledTableCell>
                        <StyledTableCell>{product.count}</StyledTableCell>
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
  orders: Order[];
  setIsOpen: (isOpen: boolean) => void;
  setOrderCurrent: (orders: Order) => void;
}

export default function TableCocina({
  orders,
  setIsOpen,
  setOrderCurrent,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Mesa</StyledTableCell>
            <StyledTableCell align="center">Total de alimentos</StyledTableCell>
            <StyledTableCell>Responsable de la comanda</StyledTableCell>
            <StyledTableCell>Quien creo la orden</StyledTableCell>
            <StyledTableCell>Fecha de creacion</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row
              key={order.id}
              order={order}
              setIsOpen={setIsOpen}
              setOrderCurrent={setOrderCurrent}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
