import { Grid } from "@mui/material";

import useGetTests from "@/src/hooks/api/useGetTests";
import TestCard from "../TestCard";

const TestSection = (props) => {
  const { tests, getTestsLoading, getTestsError } = useGetTests();

  if (getTestsLoading) {
    return <>Loading</>;
  }

  if (getTestsError) {
    return <>Error</>;
  }

  return (
    <Grid container spacing={3}>
      {tests.map((test) => {
        return <TestCard key={test.id} {...test} {...props} />;
      })}
    </Grid>
  );
};

export default TestSection;
