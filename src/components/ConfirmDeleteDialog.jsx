import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteDialog({
  openConfirm,
  setOpenConfirm,
  handleDelete,
}) {
  const handleClose = () => {
    setOpenConfirm(false);
  };

  return (
    <div>
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="confirm-send-test"
      >
        <DialogTitle>Confirma o exclusão?</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-send-test">
            Essa ação nao poderá ser desfeita
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button type="submit" onClick={handleDelete} color="warning">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
