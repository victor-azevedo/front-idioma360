import dayjs from "dayjs";

export function getDayFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("DD/MM/YYYY");
}

export function getTimeFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("HH:mm");
}
