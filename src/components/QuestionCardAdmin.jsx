import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";
import handleResponseError from "../errors/handleResponseError";
import useDeleteQuestion from "../hooks/api/useDeleteQuestion";
import AdminEditDeleteBox from "./AdminEditDeleteBox";
import QuestionItemAdmin from "./QuestionItemAdmin";

export default function QuestionCardAdmin({
  id,
  title,
  optionA,
  optionB,
  optionC,
  optionD,
  correctAnswer,
}) {
  const router = useRouter();

  const { deleteQuestion, deleteQuestionError } = useDeleteQuestion();

  if (deleteQuestionError) {
    router.push("/app/admin/tests");
  }

  const handleDeleteQuestion = useCallback(async () => {
    try {
      await deleteQuestion(id);
      toast.success("Questão excluída com sucesso");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.replace(router.asPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ m: 3 }} variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" marginBottom={1}>
            {title}
          </Typography>
          <QuestionItemAdmin
            text={optionA}
            questionId={id}
            isCorrect={correctAnswer === "optionA"}
          />
          <QuestionItemAdmin
            text={optionB}
            questionId={id}
            isCorrect={correctAnswer === "optionB"}
          />
          <QuestionItemAdmin
            text={optionC}
            questionId={id}
            isCorrect={correctAnswer === "optionC"}
          />
          <QuestionItemAdmin
            text={optionD}
            questionId={id}
            isCorrect={correctAnswer === "optionD"}
          />
        </Stack>
      </CardContent>
      <AdminEditDeleteBox handleDelete={handleDeleteQuestion} onlyDelete />
    </Card>
  );
}
