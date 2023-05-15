import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LoadingDots from "@/src/components/LoadingDots";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "@/src/helpers";
import useGetClasseById from "@/src/hooks/api/useGetClasseById";
import { useClasseToEnroll } from "@/src/hooks/useClasseToEnroll";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const router = useRouter();
  const { cid } = router.query;

  const { classe, getClasseById, getClasseByIdLoading } = useGetClasseById();
  const { setClasseToEnroll } = useClasseToEnroll();

  useEffect(() => {
    if (cid) {
      getClasseById(cid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  function handleForwardEnroll() {
    setClasseToEnroll({ ...classe });
    router.push(`/app/classes/${cid}/enroll`);
  }

  if (!classe) {
    return <LoadingDots />;
  }

  if (getClasseByIdLoading) {
    return <LoadingDots />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {classe.course.name}{" "}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {classe.course.description}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Carga horária: {classe.course.creditHours} horas
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        {classe.name}
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Período do Curso:{" "}
        {` ${getDayFromISOdate(classe.startDate)} à ${getDayFromISOdate(
          classe.endDate
        )}`}
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        {classe.days.length === 1 ? "Dia" : "Dias"}:{" "}
        {weekDaysToPtBR(classe.days)}
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Horário das aulas:{" "}
        {` ${getTimeFromISOdate(classe.startTime)} às ${getTimeFromISOdate(
          classe.endTime
        )}`}
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Vagas disponíveis: {classe.vacancies}
      </Typography>
      <Button
        onClick={handleForwardEnroll}
        variant="contained"
        size="medium"
        sx={{ mt: 2 }}
        disabled={classe.isUserEnrolledFOrThisClasse}
      >
        Inscrever-se
      </Button>
      {classe.isUserEnrolledFOrThisClasse ? (
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Você ja se encontra inscrito
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Turma">{page}</DashboardLayout>
);

export default Page;
