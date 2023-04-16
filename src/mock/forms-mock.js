import dayjs from "dayjs";

export const courses = [
  { id: 4, name: "Alemão" },
  { id: 2, name: "Espanhol" },
  { id: 3, name: "Francês" },
  { id: 1, name: "Inglês" },
];

export const initialValuesOfferForm = {
  name: "Seleção Teste",
  startDate: dayjs(),
  endDate: dayjs().add(1, "day"),
  testDate: dayjs().add(2, "day"),
  testStartTime: dayjs(),
  testEndTime: dayjs().add(10, "m"),
  resultDate: dayjs().add(3, "day"),
  enrollPrice: 15000,
  status: "blocked",
};

export const initialValuesClasseForm = {
  name: "Turma Teste",
  startDate: dayjs(),
  endDate: dayjs().add(1, "day"),
  startTime: dayjs(),
  endTime: dayjs().add(10, "m"),
  vacancies: 35,
  courseId: 1,
  days: ["Sunday", "Friday"],
};
