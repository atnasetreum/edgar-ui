import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Comanda } from "ts/interfaces";
import { useEffect } from "react";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  setTableSelected: (tableSelected: number) => void;
  tableNumber: number;
  comandas: Comanda[];
}

export default function CardTable({
  setIsOpen,
  setTableSelected,
  tableNumber,
  comandas,
}: Props) {
  const [comandaCurrent, setComandaCurrent] = React.useState<Comanda | null>(
    null
  );

  useEffect(() => {
    if (comandas.length) {
      const comanda = comandas.find((comanda) => comanda.mesa === tableNumber);
      if (comanda) {
        setComandaCurrent(comanda);
      }
    }
  }, [comandas, tableNumber]);

  const TitleState = React.useMemo(() => {
    let title = "";
    if (comandaCurrent) {
      const { orders } = comandaCurrent;
      const ordersInProgressCount = orders.filter(
        (order) => order.state === "En Progreso"
      ).length;
      const ordersInProgress = !!ordersInProgressCount;
      title = ordersInProgress
        ? `${ordersInProgressCount} ${
            ordersInProgressCount === 1 ? "orden" : "ordenes"
          } en progreso ...`
        : "Pendiente por pagar";
    }
    return title;
  }, [comandaCurrent]);

  return (
    <Grid
      item
      xs={12}
      onClick={() => {
        setIsOpen(true);
        setTableSelected(tableNumber);
      }}
    >
      <CardActionArea disableRipple>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Grid container>
              <Grid item xs={10} md={10} lg={10}>
                <Typography component="h2" variant="h5">
                  Table {tableNumber}
                </Typography>
              </Grid>
            </Grid>
            {comandaCurrent && (
              <Typography variant="subtitle1" color="text.primary">
                Creada: {comandaCurrent.user.name}
              </Typography>
            )}
            {comandaCurrent ? (
              <Typography variant="h6" color="primary">
                {TitleState}
              </Typography>
            ) : (
              <Typography variant="h6" color="primary">
                Disponible
              </Typography>
            )}
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 200,
              height: 200,
              display: { xs: "none", sm: "block" },
            }}
            image={
              comandaCurrent?.state === "Pendiente por pagar"
                ? "https://media.tenor.com/bA2zNFB_9joAAAAM/hasbulla-cooking.gif"
                : "https://www.collinet-sieges.com/img/products/zoom/1198-table-ref4402-2.jpg"
            }
            alt={"image"}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
