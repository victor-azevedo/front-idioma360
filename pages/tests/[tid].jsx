import ConfirmDialog from "@/src/components/ConfirmDialog";
import LoadingDots from "@/src/components/LoadingDots";
import QuestionCard from "@/src/components/QuestionCard";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetTestById from "@/src/hooks/api/useGetTestById";
import usePostUserTestAnswers from "@/src/hooks/api/usePostUserTestAnswers";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Layout as TestLayout } from "src/layouts/test/layout";

const Page = () => {
  const router = useRouter();
  const { tid } = router.query;

  const { test, getTestById, getTestByIdLoading, getTestByIdError } =
    useGetTestById();
  const { postUserTestAnswers, postUserTestAnswersError } =
    usePostUserTestAnswers();

  const [questionsAnswers, setQuestionsAnswers] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (tid) {
      getTestById(tid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tid]);

  useEffect(() => {
    if (test?.questions) {
      const questionsAnswersInitial = {};
      test.questions.forEach((question) => {
        questionsAnswersInitial[question.id] = "";
      });
      setQuestionsAnswers(questionsAnswersInitial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  if (getTestByIdError) {
    return <>Error</>;
  }

  if (!test) {
    return <LoadingDots />;
  }

  if (getTestByIdLoading) {
    return <LoadingDots />;
  }

  if (postUserTestAnswersError) {
    router.push("/app");
  }

  const isNotAnswered = Object.values(questionsAnswers).includes("");

  async function handleSendAnswers() {
    setOpenConfirm(false);
    const body = Object.entries(questionsAnswers).map(([key, value]) => ({
      questionId: parseInt(key),
      userAnswer: value,
    }));
    try {
      await postUserTestAnswers({ id: tid, body });
      toast.success("Respostas enviadas com sucesso");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.push("/app");
    }
  }

  return (
    <>
      <Head>
        <title>{test.name} | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              {test.name}
            </Typography>
            {test.questions.map((question) => (
              <QuestionCard
                key={question.id}
                questionsAnswers={questionsAnswers}
                setQuestionsAnswers={setQuestionsAnswers}
                {...question}
              />
            ))}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={() => setOpenConfirm(true)}
              disabled={isNotAnswered}
            >
              Enviar Respostas
            </Button>
            <ConfirmDialog
              openConfirm={openConfirm}
              setOpenConfirm={setOpenConfirm}
              handleSendAnswers={handleSendAnswers}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <TestLayout>{page}</TestLayout>;

export default Page;
