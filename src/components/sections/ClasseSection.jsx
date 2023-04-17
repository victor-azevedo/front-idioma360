import { Grid } from "@mui/material";

import ClasseCard from "@/src/components/ClasseCard";
import useGetClasses from "@/src/hooks/api/useGetClasses";
import LoadingDots from "../LoadingDots";

const ClasseSection = (props) => {
  const { classes, getClassesLoading, getClassesError } = useGetClasses();

  if (getClassesLoading) {
    return <LoadingDots />;
  }

  if (getClassesError) {
    return <>Error</>;
  }

  return (
    <Grid container spacing={3}>
      {classes.map((classe) => {
        return (
          <Grid key={classe.id}>
            <ClasseCard {...classe} {...props} disabledOnclick />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ClasseSection;
