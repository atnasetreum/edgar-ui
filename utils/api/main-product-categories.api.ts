import { Mpc } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/main-product-categories";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as Mpc[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as Mpc;
}

async function update(id: number, payload: object) {
  const { data } = await api.patch(`${basePath}/${id}`, payload);
  return data as Mpc;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as Mpc;
}

export const MPCApi = {
  getAll,
  create,
  update,
  remove,
};
