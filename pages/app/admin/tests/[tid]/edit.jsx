import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import LoadingDots from "@/src/components/LoadingDots";
import QuestionCardAdmin from "@/src/components/QuestionCardAdmin";
import QuestionForm from "@/src/components/forms/QuestionForm";
import TestForm from "@/src/components/forms/TestForm";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetCourses from "@/src/hooks/api/useGetCourses";
import useGetTestByIdAdmin from "@/src/hooks/api/useGetTestByIdAdmin";
import { initialValuesQuestionForm } from "@/src/mock/forms-mock";

const Page = () => {
  const router = useRouter();

  const {
    test,
    getTestByIdAdmin,
    getTestByIdAdminLoading,
    getTestByIdAdminError,
  } = useGetTestByIdAdmin(false);

  const { courses, getCoursesError } = useGetCourses();

  const [openQuestionForm, setOpenQuestionForm] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);

  useEffect(() => {
    async function getTestData() {
      if (router.isReady) {
        try {
          await getTestByIdAdmin(router.query.tid);
        } catch (error) {
          handleResponseError(error);
        }
        return;
      }
    }
    getTestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (test) {
      setTestQuestions([...test.questions]);
    }
  }, [test]);

  if (!test || !courses) {
    return <LoadingDots />;
  }

  if (getTestByIdAdminLoading) {
    return <LoadingDots />;
  }

  if (getTestByIdAdminError || getCoursesError) {
    router.push("/app/admin/tests");
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h3" marginLeft={3}>
          Editar Prova
        </Typography>
        <TestForm
          {...test}
          courses={courses}
          disabled={test.id ? true : false}
        />
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h5" marginLeft={3}>
          Questões Cadastradas:
        </Typography>
        {testQuestions.length > 0 ? (
          <Stack spacing={3}>
            {testQuestions.map((question) => {
              return <QuestionCardAdmin key={question.id} {...question} />;
            })}
          </Stack>
        ) : (
          <Box marginLeft={3}>
            <Typography variant="body1" marginLeft={3}>
              Nenhuma questão cadastrada ainda.
            </Typography>
          </Box>
        )}
      </Stack>
      {openQuestionForm && (
        <Stack spacing={3}>
          <QuestionForm
            testId={test.id}
            setOpenQuestionForm={setOpenQuestionForm}
            setTestQuestions={setTestQuestions}
            testQuestions={testQuestions}
            getTestByIdAdmin={getTestByIdAdmin}
            {...initialValuesQuestionForm}
          />
        </Stack>
      )}
      {test.id && !openQuestionForm ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOpenQuestionForm(true)}
            disabled={openQuestionForm}
          >
            Inserir Questão
          </Button>
        </Box>
      ) : (
        ""
      )}
      {testQuestions.length > 0 && (
        <Button
          variant="contained"
          onClick={() => router.push("/app/admin/tests")}
          disabled={openQuestionForm}
        >
          Concluir Edição
        </Button>
      )}
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Editar Prova">{page}</DashboardLayout>
);

export default Page;
