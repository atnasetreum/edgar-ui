import { User, UserLogin } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/users";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as User[];
}

async function getUsersLogin() {
  const { data } = await api.get(`${basePath}/users-login`);
  return data as UserLogin[];
}

async function create(payload: object) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as User;
}

async function update(id: number, payload: object) {
  const { data } = await api.patch(`${basePath}/${id}`, payload);
  return data as User;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as User;
}

export const UserApi = {
  getAll,
  getUsersLogin,
  create,
  update,
  remove,
};
