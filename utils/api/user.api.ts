import { User, UserLogin } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/users";

async function getAll() {
  const { data } = await api.get(`${basePath}`);
  return data as User[];
}

async function getDrivers() {
  const { data } = await api.get(`${basePath}/drivers`);
  return data as { id: number; name: string }[];
}

async function getUsersLogin() {
  const { data } = await api.get(`${basePath}/users-login`);
  return data as UserLogin[];
}

async function save(payload: {
  name: string;
  password: string;
  idUserType: number;
}) {
  const { data } = await api.post(`${basePath}`, payload);
  return data as User;
}

async function remove(id: number) {
  const { data } = await api.delete(`${basePath}/${id}`);
  return data as User;
}

export const UserApi = {
  getAll,
  getUsersLogin,
  save,
  remove,
  getDrivers,
};
