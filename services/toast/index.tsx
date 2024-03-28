import { Bounce, ToastPosition, toast } from "react-toastify";

export const SuccessToast = (message: string, position = "top-right") =>
  toast.success(message, {
    position: position as any,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const ErrorToast = (message: string, position = "top-right") =>
  toast.error(message, {
    position: position as any,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const WarningToast = (message: string, position = "top-right") =>
  toast.warn(message, {
    position: position as any,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
