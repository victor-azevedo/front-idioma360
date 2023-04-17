import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const AdminEditDeleteBox = ({
  redirectEditRoute,
  handleDelete,
  onlyEdit,
  onlyDelete,
}) => {
  const router = useRouter();

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
      {!onlyDelete && (
        <Button size="large" onClick={() => router.push(redirectEditRoute)}>
          <EditNoteRoundedIcon />
          Editar
        </Button>
      )}
      {!onlyEdit && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default AdminEditDeleteBox;
