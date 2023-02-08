import { UserType } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/user-types";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as UserType[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as UserType;
}

async function update(id: number, payload: object) {
  const { data } = await api.patch(`${basePath}/${id}`, payload);
  return data as UserType;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as UserType;
}

export const UserTypeApi = {
  getAll,
  create,
  update,
  remove,
};
