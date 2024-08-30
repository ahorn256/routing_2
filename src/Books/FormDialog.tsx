import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { Book, InputBook } from './Book';
import formValidationSchema from './formValidationSchema';

type Props = {
  open: boolean,
  onSave: (book:InputBook) => void,
  onClose: () => void,
  book?: Book|null,
};

const FormDialog:React.FC<Props> = ({ open, onSave, onClose, book = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InputBook>({
    resolver: yupResolver(formValidationSchema),
  });

  useEffect(() => {
    if(book) {
      reset(book);
    } else {
      reset({
        title: '',
        author: '',
        isbn: '',
      });
    }
  }, [ open, book, reset ]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      aria-describedby='form-dialog-description'>
      <DialogTitle id='form-dialog-title'>
        { book ? 'Buch bearbeiten' : 'Neues Buch anlegen' }
      </DialogTitle>

      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}>
        <Close />
      </IconButton>

      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent id='form-dialog-description'>
          <Grid container direction={'column'} rowSpacing={1} display='flex'>
            <Grid item>
              <TextField fullWidth={true} label='Titel' error={!!errors.title} {...register('title')}/>
              { errors.title && <div className='error'>{errors.title.message}</div> }
            </Grid>
            <Grid item>
              <TextField fullWidth={true} label='Author' error={!!errors.author} {...register('author')}/>
              { errors.author && <div className='error'>{errors.author.message}</div> }
            </Grid>
            <Grid item>
              <TextField fullWidth={true} label='ISBN' error={!!errors.isbn} {...register('isbn')}/>
              { errors.isbn && <div className='error'>{errors.isbn.message}</div> }
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button type='submit'>Speichern</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
