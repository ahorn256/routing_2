import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { convertToFetchError, IFetchError } from "../FetchError";

function DeletionDialog() {
  const [ open, setOpen ] = useState(false);
  const { id } = useParams<{id:string}>();
  const [ fetchError, setFetchError ] = useState<IFetchError|null>(null);
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    setOpen(false);
    navigate('/books');
  }, [navigate]);

  const deleteBook = useCallback((id: string) =>
    (async () => {
      try {
        setFetchError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');

        const response = await fetch(`${url}/${id}`, {
          method: 'DELETE',
        });

        if(response.ok) {
          onClose();
        } else {
          throw new Error(`Couldn't delete the book with the id "${id}".`);
        }
      } catch(error) {
        setFetchError(convertToFetchError(error));
      }
    }
  )(), [onClose]);

  useEffect(() => {
    setOpen(true);
  }, [id]);

  function onConfirm(confirmed: boolean) {
    if(confirmed && id) {
      deleteBook(id);
    } else {
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description">

      <DialogTitle id="confirm-dialog-title">
        { fetchError ? 'Error' : 'Confirm deletion' }
      </DialogTitle>

      <IconButton
        onClick={() => onConfirm(false)}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
        }}>
        <Close />
      </IconButton>

      <DialogContent id="confirm-dialog-description">
        { fetchError && <div className="error">{fetchError.message}</div>}
        { !fetchError && `Do you want remove "${id}"?`}
      </DialogContent>

      { !fetchError &&
        <DialogActions>
          <Button onClick={() => onConfirm(false)}>Abbrechen</Button>
          <Button onClick={() => onConfirm(true)}>Ok</Button>
        </DialogActions>}
    </Dialog>
  );
}

export default DeletionDialog;
