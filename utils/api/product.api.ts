import { Product } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/products";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as Product[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as Product;
}

async function update(id: number, payload: object) {
  const { data } = await api.patch(`${basePath}/${id}`, payload);
  return data as Product;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as Product;
}

export const ProductApi = {
  getAll,
  create,
  update,
  remove,
};
