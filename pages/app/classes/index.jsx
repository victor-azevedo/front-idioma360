import { Stack, Typography } from "@mui/material";

import CourseClassesCard from "@/src/components/CouseClassesCard";
import LoadingDots from "@/src/components/LoadingDots";
import useGetCoursesClasses from "@/src/hooks/api/useGetCoursesClasses";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { coursesClasses, getCoursesClassesLoading } =
    useGetCoursesClasses("open");

  if (getCoursesClassesLoading) {
    return <LoadingDots />;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Turmas disponíveis
      </Typography>
      {coursesClasses.map((course) => (
        <CourseClassesCard key={course.id} {...course} />
      ))}
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Turmas">{page}</DashboardLayout>
);

export default Page;
