import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Comanda } from "ts/interfaces";
import { useMemo } from "react";

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
  const comanda = useMemo(() => {
    return comandas.find((comanda) => comanda.mesa === tableNumber);
  }, [comandas, tableNumber]);

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
            {comanda && (
              <Typography variant="subtitle1" color="text.primary">
                Creada: {comanda.user.name}
              </Typography>
            )}
            <Typography variant="h6" color="primary">
              {comanda?.state || "Disponible"}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 200,
              height: 200,
              display: { xs: "none", sm: "block" },
            }}
            image={
              comanda?.state === "En progreso"
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
