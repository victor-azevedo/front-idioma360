import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import handleResponseError from "@/src/errors/handleResponseError";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "@/src/helpers";
import useGetClasseById from "@/src/hooks/api/useGetClasseById";
import usePostEnrollment from "@/src/hooks/api/usePostEnrollment";

export default function Classe() {
  const router = useRouter();
  const { cid } = router.query;

  const { classe, getClasseById } = useGetClasseById();
  const { postEnrollment } = usePostEnrollment();

  const [
    isUserEnrolledForThisClasseOffer,
    setIsUserEnrolledForThisClasseOffer,
  ] = useState(false);

  useEffect(() => {
    if (cid) {
      getClasseById(cid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  useEffect(() => {
    if (classe?.offering?.enrollment?.length > 0) {
      const { enrollment } = classe.offering;
      const enrollmentForThisClasseOffer = enrollment.find(
        (enroll) => enroll.offeringId === classe.offering.id
      );

      setIsUserEnrolledForThisClasseOffer(
        enrollmentForThisClasseOffer ? true : false
      );
    }
  }, [classe]);

  async function handleEnrollment() {
    try {
      await postEnrollment(classe.offering.id);
      toast.success("Informações salvas com sucesso!");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.push("/offerings");
    }
  }

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
        disabled={isUserEnrolledForThisClasseOffer}
      >
        Inscrever-se
      </Button>
      {isUserEnrolledForThisClasseOffer ? (
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Você ja se encontra inscrito
        </Typography>
      ) : (
        ""
      )}
    </>
  );
}
