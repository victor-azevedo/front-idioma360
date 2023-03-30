import { toast } from "react-toastify";

export default function handleError(error) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error?.message) {
    toast.error(error.message);
  }
}
