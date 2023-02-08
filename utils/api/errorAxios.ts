import { TypeOptions } from "react-toastify";

export const errorAxios = (
  err: any,
  notify: (msg: string, type?: TypeOptions | undefined) => void
) => {
  const msg =
    err.response?.data?.message || err.response?.message[0] || err.message;
  notify(msg.toString());
};
