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
  return weekDays.map((weekDay) => weekDayPtBR[weekDay]).join(" | ");
}

export function getDayFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("DD/MM/YYYY");
}

export function getTimeFromISOdate(ISOdate) {
  return dayjs(ISOdate).format("HH[h]mm[min]");
}

export function isToday(ISOdate) {
  return getDayFromISOdate(ISOdate) === getDayFromISOdate();
}

export const parseDateTimeValuesToAPI = (object) => {
  const DATE_KEYS = [
    "birthday",
    "startDate",
    "endDate",
    "testDate",
    "resultDate",
  ];
  const TIME_KEYS = ["testStartTime", "testEndTime", "startTime", "endTime"];

  DATE_KEYS.forEach((dateKey) => {
    if (object[dateKey]) {
      object[dateKey] = dayjs(object[dateKey]).format("YYYY-MM-DD");
    }
  });
  TIME_KEYS.forEach((timeKey) => {
    if (object[timeKey]) {
      object[timeKey] = dayjs(object[timeKey]).format("HH:mm");
    }
  });

  return object;
};
