import { UserType } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/user-types";

async function getAll() {
  const { data } = await api.get(`${basePath}`);
  return data as UserType[];
}

export const UserTypeApi = {
  getAll,
};
