import { UserSession } from "../../ts/interfaces";
import { api } from "./axiosWrapper";

const basePath = "/auth";

async function login(payload: { id: number; password: string }) {
  const { data } = await api.post(`${basePath}/login`, payload);
  return data as UserSession;
}

async function validateToken() {
  const { data } = await api.get(`${basePath}/validate-token`);
  return data as UserSession;
}

export const AuthApi = {
  login,
  validateToken,
};
