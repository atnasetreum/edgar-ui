import { toast, TypeOptions } from "react-toastify";

export const useNotify = () => {
  const notify = (msg: string, type?: TypeOptions) => {
    toast(msg, {
      hideProgressBar: false,
      autoClose: 2000,
      type: type ?? "warning",
      position: "top-right",
    });
  };
  return {
    notify,
  };
};
