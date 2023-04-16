import { Grid } from "@mui/material";

import ClasseCard from "@/src/components/ClasseCard";
import useGetClasses from "@/src/hooks/api/useGetClasses";

const ClasseSection = (props) => {
  const { classes, getClassesLoading, getClassesError } = useGetClasses();

  if (getClassesLoading) {
    return <>Loading</>;
  }

  if (getClassesError) {
    return <>Error</>;
  }

  return (
    <Grid container spacing={3}>
      {classes.map((course) => {
        return (
          <Grid key={course.id}>
            <ClasseCard {...course} {...props} disabledOnclick />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ClasseSection;
