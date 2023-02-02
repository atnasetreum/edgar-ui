import axios, { AxiosHeaders, AxiosRequestHeaders } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROUTE,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token") || "";

    const headers = { ...config.headers } as AxiosHeaders;
    headers["x-app-key"] = process.env.NEXT_PUBLIC_APP_KEY;
    headers["authorization"] = `Bearer ${token}`;

    config.headers = headers;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { api };
