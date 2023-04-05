import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import UserEnrollmentCard from "@/src/components/UserEnrollmentCard";
import useGetUserEnrollments from "@/src/hooks/api/useGetUserEnrollments";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const {
    userEnrollments,
    getUserEnrollmentsLoading,
    getUserEnrollmentsError,
  } = useGetUserEnrollments();

  if (getUserEnrollmentsLoading) {
    return <>Loading</>;
  }

  if (getUserEnrollmentsError) {
    return <>Error</>;
  }

  return (
    <>
      <Head>
        <title>Inscrições | Idioma 360</title>
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
              Inscrições
            </Typography>
            {userEnrollments.map((enrollment) => (
              <UserEnrollmentCard key={enrollment.id} {...enrollment.classe} />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
