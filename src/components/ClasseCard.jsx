import { Box } from "@mui/material";
import { useRouter } from "next/router";
import ClasseCardInfo from "./ClasseCardInfo";

export default function ClasseCard({
  id,
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
  course,
}) {
  const router = useRouter();
  function handleClasseCardClick() {
    router.push(`/app/classes/${id}`);
  }

  return (
    <Box onClick={() => handleClasseCardClick()} sx={{ cursor: "pointer" }}>
      <ClasseCardInfo
        name={name}
        days={days}
        startTime={startTime}
        endTime={endTime}
        startDate={startDate}
        endDate={endDate}
        vacancies={vacancies}
        courseName={course && course.name}
      />
    </Box>
  );
}
