import { History } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/histories";

async function getAll(params: object) {
  const { data } = await api.get(`${basePath}`, { params });
  return data as History[];
}

export const HistoryApi = {
  getAll,
};
