import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import React from "react";

type Props = {
  title: string,
  text: string,
  open: boolean,
  onConfirm: (confirm:boolean) => void,
};

const ConfirmDialog:React.FC<Props> = ({ title, text, open, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onConfirm(false)}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description">

      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>

      <IconButton
        onClick={() => onConfirm(false)}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
        }}>
        <Close />
      </IconButton>

      <DialogContent id="confirm-dialog-description">{text}</DialogContent>

      <DialogActions>
        <Button onClick={() => onConfirm(false)}>Abbrechen</Button>
        <Button onClick={() => onConfirm(true)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
