import { Stack, Typography } from "@mui/material";

import LoadingDots from "@/src/components/LoadingDots";
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
    return <LoadingDots />;
  }

  if (getUserEnrollmentsError) {
    return <>Error</>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Minhas Inscrições
      </Typography>
      {userEnrollments.map((enrollment) => (
        <UserEnrollmentCard key={enrollment.id} {...enrollment.classe} />
      ))}
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Minhas Inscrições">{page}</DashboardLayout>
);

export default Page;
