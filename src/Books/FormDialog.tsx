import { Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { InputBook } from './Book';
import formValidationSchema from './formValidationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { convertToFetchError, IFetchError } from '../FetchError';

function FormDialog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InputBook>({
    resolver: yupResolver(formValidationSchema),
  });
  const [ fetchError, setFetchError ] = useState<IFetchError|null>(null);
  const { id } = useParams<{id:string}>();
  const [ open, setOpen ] = useState(false);
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    setOpen(false);
    navigate('/books');
  }, [navigate]);

  const fetchBook = useCallback((id: string|undefined) => {
    (async () => {
      try {
        setFetchError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');
        
        const response = await fetch(`${url}/${id}`);

        if(response.ok) {
          const data = await response.json();
          reset(data);
        } else {
          throw new Error(`Couldn't fetch the book with the id "${id}"`);
        }
      } catch(error) {
        setFetchError(convertToFetchError(error));
      } finally {
        setOpen(true);
      }
    })();
  }, [reset]);

  const updateBook = useCallback((book: InputBook) => {
    (async () => {
      try {
        setFetchError(null);

        if(!('id' in book)) throw new Error(`Couldn't update a book. "id" is missing.`);

        const msgEditFailed = `Couldn't edit a book with the id="${book.id}"`;
        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL is not defined');

        const response = await fetch(`${url}/${book.id}`, {
          method: 'PUT',
          body: JSON.stringify(book),
          headers: { 'content-type': 'application/json' },
        });

        if(response.ok) {
          onClose();
        } else {
          throw new Error(msgEditFailed);
        }
      } catch(error) {
        setFetchError(convertToFetchError(error));
      }
    })();
  }, [onClose]);

  const addBook = useCallback((book:InputBook) => {
    (async () => {
      try {
        setFetchError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;
        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(book),
          headers: { 'content-type': 'application/json' },
        });
        
        if(response.ok) {
          onClose();
        } else {
          throw new Error(`Couldn't add the book "${book.title}"`);
        }
      } catch(error) {
        setFetchError(convertToFetchError(error));
      }
    })();
  }, [onClose]);

  useEffect(() => {
    if(id) {
      fetchBook(id);
    } else {
      setOpen(true);
    }
  }, [id, fetchBook]);

  function onSave(book: InputBook) {
    if('id' in book) {
      updateBook(book);
    } else {
      addBook(book);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      aria-describedby='form-dialog-description'>
      <DialogTitle id='form-dialog-title'>
        {id ? 'Buch bearbeiten' : 'Neues Buch anlegen'}
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
          {fetchError && <div className='error'>{fetchError.message}</div>}
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
