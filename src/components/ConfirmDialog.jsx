import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({openConfirm, setOpenConfirm, handleSendAnswers}) {
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
        <DialogTitle>{"Confirme o envio das suas respostas"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-send-test">
            Após o envio suas respostas não poderão ser alteradas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Revisar respostas</Button>              
          <Button type="submit" variant="contained" onClick={handleSendAnswers}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}