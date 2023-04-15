import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Avatar, Box, Button, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardStyled from "./CardStyled";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

export default function CourseCard({
  id,
  name,
  creditHours,
  description,
  imageUrl,
  admin,
  setDeleteCourseId,
  handleDeleteCourse,
}) {
  const router = useRouter();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    if (openConfirmDialog) {
      setDeleteCourseId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openConfirmDialog]);

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
          <Box sx={{ display: "flex", gap: 10 }}>
            <Button
              size="large"
              onClick={() => router.push(`/app/admin/courses/${id}/edit`)}
            >
              <EditNoteRoundedIcon />
              Editar
            </Button>
            <Button
              size="large"
              onClick={() => setOpenConfirmDialog(true)}
              color="warning"
            >
              <DeleteSweepRoundedIcon />
              Deletar
            </Button>
            <ConfirmDeleteDialog
              openConfirm={openConfirmDialog}
              setOpenConfirm={setOpenConfirmDialog}
              handleDelete={handleDeleteCourse}
            />
          </Box>
        )}
      </CardContent>
    </CardStyled>
  );
}
