export default function handleError(error) {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error?.message) {
    alert(error.message);
  }
}
