import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ClasseEnrollInfo from "@/src/components/ClasseEnrollInfo";
import UserAddressForm from "@/src/components/UserAddressForm";
import UserInfo from "@/src/components/UserInfo";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetUserData from "@/src/hooks/api/useGetUserData";
import usePostEnrollment from "@/src/hooks/api/usePostEnrollment";
import { useClasseToEnroll } from "@/src/hooks/useClasseToEnroll";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const router = useRouter();
  const { cid } = router.query;

  const { userData } = useGetUserData();
  const { postEnrollment } = usePostEnrollment();
  const { classeToEnroll } = useClasseToEnroll();

  async function handleEnrollment() {
    try {
      await postEnrollment(classeToEnroll.id);
      toast.success("Inscrito com sucesso!");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.push(`/app`);
    }
  }

  if (!cid || !userData) {
    return <>Loading</>;
  }

  if (!classeToEnroll.id) {
    router.push(`/app/classes/${cid}`);
  }

  if (cid && classeToEnroll.id !== parseInt(cid)) {
    router.push(`/app/classes/${classeToEnroll.id}`);
  }

  return (
    <>
      <Head>
        <title>Inscrição | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Inscrição
          </Typography>
          <Stack spacing={3}>
            <UserInfo {...userData} />
            <UserAddressForm {...userData.address} />
            <ClasseEnrollInfo {...classeToEnroll} />
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={handleEnrollment}
              disabled={classeToEnroll.isUserEnrolledFOrThisClasse}
            >
              Inscrever
            </Button>
            {classeToEnroll.isUserEnrolledFOrThisClasse ? (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Você ja se encontra inscrito
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
