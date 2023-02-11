import { Mp } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/product-categories";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as Mp[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as Mp;
}

async function update(id: number, payload: object) {
  const { data } = await api.patch(`${basePath}/${id}`, payload);
  return data as Mp;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as Mp;
}

export const MPApi = {
  getAll,
  create,
  update,
  remove,
};
