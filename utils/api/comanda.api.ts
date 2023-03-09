import { Order } from "ts/interfaces/order.interface";
import { Comanda } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/comandas";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as Comanda[];
}

async function getAllOrders(params: object) {
  const { data } = await api.get(`${basePath}/orders`, { params });
  return data as Order[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as Comanda;
}

async function addOrder(payload: object) {
  const { data } = await api.post(`${basePath}/add-order`, payload);
  return data as Comanda;
}

async function complete(id: number, payload: object) {
  const { data } = await api.post(`${basePath}/complete/${id}`, payload);
  return data as Comanda;
}

export const ComandaApi = {
  getAll,
  create,
  complete,
  getAllOrders,
  addOrder,
};
