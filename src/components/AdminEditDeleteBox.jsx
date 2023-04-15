import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const AdminEditDeleteBox = ({ redirectRoute, handleDelete }) => {
  const router = useRouter();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  return (
    <Box sx={{ display: "flex", gap: 10 }}>
      <Button size="large" onClick={() => router.push(redirectRoute)}>
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
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default AdminEditDeleteBox;
