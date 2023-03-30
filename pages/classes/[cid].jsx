import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "@/src/helpers";
import useGetClasseById from "@/src/hooks/api/useGetClasseById";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Classe() {
  const router = useRouter();
  const { cid } = router.query;

  const { classe, getClasseById } = useGetClasseById();

  useEffect(() => {
    if (cid) {
      getClasseById(cid);
    }
  }, [cid]);

  function handleEnrollment() {}

  if (!classe) {
    return <>Loading</>;
  }

  return (
    <>
      <Typography variant="h4">Curso: {classe.course.name}</Typography>
      <Typography variant="h5">
        Descrição: {classe.course.description}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Carga horária: {classe.course.creditHours} horas
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        Turma: {classe.name}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        Período do Curso: {getDayFromISOdate(classe.startDate)} a{" "}
        {getDayFromISOdate(classe.endDate)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        {classe.days.length === 1 ? "Dia" : "Dias"}:{" "}
        {weekDaysToPtBR(classe.days).join(" | ")}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        Horário das aulas: {getTimeFromISOdate(classe.startTime)} às{" "}
        {getTimeFromISOdate(classe.endTime)}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
        Vagas disponíveis: {classe.vacancies}
      </Typography>
      <Button
        onClick={handleEnrollment}
        variant="contained"
        size="medium"
        sx={{ mt: 2 }}
      >
        Inscrever-se
      </Button>
    </>
  );
}
