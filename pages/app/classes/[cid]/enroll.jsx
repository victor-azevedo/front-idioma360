import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ClasseEnrollInfo from "@/src/components/ClasseEnrollInfo";
import LoadingDots from "@/src/components/LoadingDots";
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
    return <LoadingDots />;
  }

  if (!classeToEnroll.id) {
    router.push(`/app/classes/${cid}`);
  }

  if (cid && classeToEnroll.id !== parseInt(cid)) {
    router.push(`/app/classes/${classeToEnroll.id}`);
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Inscrição
      </Typography>
      <UserInfo {...userData} />
      <UserAddressForm {...userData.address} />
      <ClasseEnrollInfo {...classeToEnroll} />
      <Button
        fullWidth
        size="large"
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
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Inscrição">{page}</DashboardLayout>
);

export default Page;
