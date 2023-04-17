import { Box, Button, Card, CardActions } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";

import handleResponseError from "../errors/handleResponseError";
import useDeleteClasse from "../hooks/api/useDeleteClasse";
import AdminEditDeleteBox from "./AdminEditDeleteBox";
import ClasseCardInfo from "./ClasseCardInfo";

export default function ClasseCard({
  id,
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
  course,
  offering,
  testId,
  disabledOnclick,
  admin,
}) {
  const router = useRouter();

  function handleClasseCardClick() {
    router.push(`/app/classes/${id}`);
  }

  const { deleteClasse } = useDeleteClasse();

  const handleDeleteClasse = useCallback(async () => {
    try {
      await deleteClasse(id);
      toast.success("Turma excluída com sucesso");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      onClick={() => (disabledOnclick ? null : handleClasseCardClick())}
      sx={{ cursor: disabledOnclick ? "inherit" : "pointer" }}
    >
      <Card sx={{ m: 3, width: 300 }} variant="outlined">
        <ClasseCardInfo
          name={name}
          days={days}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          endDate={endDate}
          vacancies={vacancies}
          courseName={course && course.name}
          courseImage={course && course.imageUrl}
          offeringName={offering && offering.name}
        />
        {admin && testId && (
          <CardActions
            sx={{
              w: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              onClick={() => router.push(`/app/admin/tests/${testId}`)}
              color="inherit"
            >
              Prova Cadastrada
            </Button>
          </CardActions>
        )}
        {admin && !testId && (
          <CardActions
            sx={{
              w: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              onClick={() => router.push("/app/admin/tests")}
              color="primary"
            >
              Cadastrar Prova
            </Button>
          </CardActions>
        )}
        {admin && (
          <CardActions
            sx={{
              w: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AdminEditDeleteBox
              handleDelete={handleDeleteClasse}
              redirectEditRoute={`/app/admin/classes/${id}/edit`}
            />
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
