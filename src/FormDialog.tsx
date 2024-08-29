import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { InputBook } from './Book';
import formValidationSchema from './formValidationSchema';

type Props = {
  open: boolean,
  onSave: (book:InputBook) => void,
  onClose: () => void,
};

const FormDialog:React.FC<Props> = ({ open, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InputBook>({
    resolver: yupResolver(formValidationSchema),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}>
      <DialogTitle>Dialog Title</DialogTitle>

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
        <DialogContent>
          <Grid container direction={'column'} rowSpacing={1}>
            <Grid item>
              <TextField label='Titel' error={!!errors.title} {...register('title')}/>
              { errors.title && <div className='error'>{errors.title.message}</div> }
            </Grid>
            <Grid item>
              <TextField label='Author' error={!!errors.author} {...register('author')}/>
              { errors.author && <div className='error'>{errors.author.message}</div> }
            </Grid>
            <Grid item>
              <TextField label='ISBN' error={!!errors.isbn} {...register('isbn')}/>
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
