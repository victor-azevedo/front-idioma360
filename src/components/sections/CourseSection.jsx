import { Stack } from "@mui/material";

import CourseCard from "@/src/components/CourseCard";
import useGetCourses from "@/src/hooks/api/useGetCourses";

const CourseSection = (props) => {
  const { courses, getCoursesLoading, getCoursesError } = useGetCourses();

  if (getCoursesLoading) {
    return <>Loading</>;
  }

  if (getCoursesError) {
    return <>Error</>;
  }

  return (
    <Stack spacing={3}>
      {courses.map((course) => {
        return <CourseCard key={course.id} {...course} {...props} />;
      })}
    </Stack>
  );
};

export default CourseSection;
