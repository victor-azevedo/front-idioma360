export default function handleResponseError(error) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error.response?.data?.details) {
    alert(error.response.data.details);
  } else if (error.response?.data) {
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}