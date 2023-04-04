import QuestionCard from "@/src/components/QuestionCard";
import useGetTestById from "@/src/hooks/api/useGetTestById";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout as TestLayout } from "src/layouts/test/layout";

const Page = () => {
  const router = useRouter();
  const { tid } = router.query;

  const { test, getTestById, getTestByIdLoading } = useGetTestById();
  const [questionsAnswers, setQuestionsAnswers] = useState({});

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

  if (!test) {
    return <>Loading</>;
  }

  if (getTestByIdLoading) {
    return <>Loading</>;
  }

  const isNotAnswered = Object.values(questionsAnswers).includes("");

  function handleSendAnswers() {
    console.log(questionsAnswers);
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
              onClick={handleSendAnswers}
              disabled={isNotAnswered}
            >
              Enviar Respostas
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <TestLayout>{page}</TestLayout>;

export default Page;
