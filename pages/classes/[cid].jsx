import handleResponseError from "@/src/errors/handleResponseError";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "@/src/helpers";
import { configClient, server, tokenService } from "@/src/services";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Classe() {
  const token = useRef(tokenService.get());
  const [classe, setClasse] = useState({});

  const router = useRouter();
  const { cid } = router.query;

  useEffect(() => {
    async function getClasse() {
      try {
        const { data } = await server.get(
          `/classes/${cid}`,
          configClient(token.current)
        );
        setClasse(data);
      } catch (error) {
        handleResponseError(error);
      }
    }
    if (cid) {
      getClasse();
    }
  }, [cid]);

  if (!classe.id) {
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
      <Button variant="contained" size="medium" sx={{ mt: 2 }}>
        Inscrever-se
      </Button>
    </>
  );
}
