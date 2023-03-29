import dayjs from "dayjs";

const weekDayPtBR = {
  Sunday: "Domingo-Feira",
  Monday: "Segunda-Feira",
  Tuesday: "Terça-Feira",
  Wednesday: "Quarta-Feira",
  Thursday: "Quinta-Feira",
  Friday: "Sexta-Feira",
  Saturday: "Sábado-Feira",
};

export function weekDaysToPtBR(weekDays) {
  return weekDays.map((weekDay) => weekDayPtBR[weekDay]);
}

export function getDayFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("DD/MM/YYYY");
}

export function getTimeFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("HH[h]mm[min]");
}
