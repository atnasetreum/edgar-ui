import Grid from "@mui/material/Grid";
import TableCocina from "components/cocina/TableCocina";
import { useNotify } from "hooks";
import MainLayout from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { Order } from "ts/interfaces";
import { ComandaApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";

export default function CocinaPage() {
  const [orders, setorders] = useState<Order[]>([]);
  const [orderCurrent, setOrderCurrent] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { notify } = useNotify();

  const getOrders = () => {
    ComandaApi.getAllOrders({ type: "comida" })
      .then(setorders)
      .catch((err) => errorAxios(err, notify));
  };

  useEffect(() => {
    getOrders();
  }, []);

  const ordenCompletada = () => {
    if (orderCurrent) {
      // ComandaApi.complete(comandaCurrent.id, comandaCurrent.comida)
      //   .then(() => {
      //     notify("Comanda servida correctamente", "success");
      //     getOrders();
      //   })
      //   .catch((err) => errorAxios(err, notify));
    }
  };

  return (
    <MainLayout title="Cocina">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <TableCocina
            orders={orders}
            setIsOpen={setIsOpen}
            setOrderCurrent={setOrderCurrent}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
