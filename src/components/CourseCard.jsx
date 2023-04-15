import { Avatar, Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";
import handleResponseError from "../errors/handleResponseError";
import useDeleteCourse from "../hooks/api/useDeleteCourse";
import AdminEditDeleteBox from "./AdminEditDeleteBox";
import CardStyled from "./CardStyled";

export default function CourseCard({
  id,
  name,
  creditHours,
  description,
  imageUrl,
  admin,
}) {
  const router = useRouter();

  const { deleteCourse } = useDeleteCourse();

  const handleDeleteCourse = useCallback(async () => {
    try {
      await deleteCourse(id);
      toast.success("Curso excluído com sucesso");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardStyled>
      <CardContent>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "1",
          }}
        >
          <Avatar src={imageUrl} alt="bandeira"></Avatar>
          <Typography variant="h5" marginX={1}>
            {name}
          </Typography>
        </Box>
        <Typography fontSize={16} color="text.primary" gutterBottom>
          {description}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="InfoText" gutterBottom>
          Carga Horária: {creditHours}
        </Typography>
        {admin && (
          <AdminEditDeleteBox
            handleDelete={handleDeleteCourse}
            redirectRoute={`/app/admin/courses/${id}/edit`}
          />
        )}
      </CardContent>
    </CardStyled>
  );
}
