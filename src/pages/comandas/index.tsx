import Grid from "@mui/material/Grid";
import CardTable from "components/comandas/CardTable";
import ModalComanda from "components/comandas/ModalComanda";
import { userTypes } from "../../../constants";
import { AuthContext } from "contexts/auth";
import { useNotify } from "hooks";
import MainLayout from "layouts/MainLayout";
import { useRouter } from "next/router";
import { useState, useEffect, useContext, useMemo } from "react";
import { ComandaApi } from "utils/api";
import { errorAxios } from "utils/api/errorAxios";
import { Comanda } from "ts/interfaces";

export interface BebidaOrComida {
  productId: number;
  count: string;
  name: string;
  note: string;
}

export interface FormComanda {
  mesa: number;
  bebida: BebidaOrComida[];
  comida: BebidaOrComida[];
}

const formInit: FormComanda = {
  mesa: 0,
  bebida: [],
  comida: [],
};

export default function ComandasPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tableSelected, setTableSelected] = useState<number>(0);
  const [form, setForm] = useState<FormComanda>(formInit);
  const { notify } = useNotify();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [comandas, setComandas] = useState<Comanda[]>([]);
  const [comandaCurrent, setComandaCurrent] = useState<Comanda | null>(null);

  const getComandas = () => {
    ComandaApi.getAll({})
      .then((resp) =>
        setComandas(resp.filter((comanda) => comanda.state !== "Pagada"))
      )
      .catch((err) => errorAxios(err, notify));
  };

  useEffect(() => {
    getComandas();
  }, []);

  const userType = useMemo(() => {
    return user?.userType;
  }, [user]);

  useEffect(() => {
    if (userType && userType !== userTypes.MESERO) {
      router.push("/dashboard");
    }
  }, [userType, router]);

  const closeModal = () => {
    setForm(formInit);
    setIsOpen(false);
    setTableSelected(0);
    setComandaCurrent(null);
  };

  const createComanda = () => {
    const removeName = (row: BebidaOrComida) => ({
      productId: Number(row.productId),
      count: Number(row.count),
      note: row.note,
    });

    ComandaApi.create({
      mesa: form.mesa,
      bebida: form.bebida.map(removeName),
      comida: form.comida.map(removeName),
    })
      .then(() => {
        notify("Comanda creada correctamente", "success");
        closeModal();
        getComandas();
      })
      .catch((err) => errorAxios(err, notify));
  };

  useEffect(() => {
    if (tableSelected) {
      setForm({ ...form, mesa: tableSelected });
    }
  }, [tableSelected]);

  return (
    <MainLayout title="Comandas">
      <ModalComanda
        isOpen={isOpen}
        tableSelected={tableSelected}
        form={form}
        setForm={setForm}
        closeModal={closeModal}
        createComanda={createComanda}
        comandaCurrent={comandaCurrent}
      />
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((table) => (
          <Grid item xs={12} md={6} lg={4} key={table}>
            <CardTable
              setIsOpen={setIsOpen}
              setTableSelected={setTableSelected}
              tableNumber={table}
              comandas={comandas}
            />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
}
