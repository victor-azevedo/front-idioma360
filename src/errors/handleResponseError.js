import { toast } from "react-toastify";

export default function handleResponseError(error) {
  // eslint-disable-next-line no-console
  console.log(error.response);
  if (error.response?.data?.details) {
    toast.error(error.response.data.details);
  } else if (error.response?.data) {
    toast.error(error.response.data.message);
  } else {
    toast.error(error.message);
  }
}
