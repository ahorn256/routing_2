import { useCallback, useEffect, useState } from 'react';
import { Fab, Grid, TextField } from '@mui/material';
import './App.css';
import List from './List';
import { Book, InputBook } from './Book';
import { convertToFetchError, IFetchError } from './FetchError';
import ErrorMessage from './ErrorMessage';
import ConfirmDialog from './ConfirmDialog';
import FormDialog from './FormDialog';
import { Add } from '@mui/icons-material';

interface IDialog {
  open: boolean,
  book: Book|null,
};

function App() {
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ filter, setFilter ] = useState('');
  const [ filteredBooks, setFilteredBooks ] = useState<Book[]>([]);
  const [ error, setError ] = useState<IFetchError|null>(null);
  const [ deleteDialog, setDeleteDialog ] = useState<IDialog>({ open: false, book: null});
  const [ formDialog, setFormDialog ] = useState<IDialog>({ open: false, book: null});

  const fetchBooks = useCallback(() =>
    (async () => {
      try {
        setError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');
        
        const response = await fetch(url);

        if(response.ok) {
        const data:Object[] = await response.json();
        setBooks(data.map(item => {
          return {
            title: 'title' in item ? String(item.title) : '',
            author: 'author' in item ? String(item.author) : '',
            isbn: 'isbn' in item ? String(item.isbn) : '',
            rating: 'rating' in item ? parseInt(String(item.rating)) : 0,
            id: 'id' in item ? String(item.id) : '0',
          }
        }));
        } else {
          throw new Error(`Couldn't fetch books`);
        }
      } catch(error) {
        setError(convertToFetchError(error));
      }
    })(), []);

  const deleteBook = useCallback((book: Book) =>
    (async () => {
      try {
        setError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');

        const response = await fetch(`${url}/${book.id}`, {
          method: 'DELETE',
        });

        if(response.ok) {
          setBooks(curBooks => curBooks.filter(b => b.id !== book.id));
        } else {
          throw new Error(`Couldn't delete the book with the title "${book.title}".`);
        }
      } catch(error) {
        setError(convertToFetchError(error));
      }
    }
  )(), []);

  const addBook = useCallback((book:InputBook) => {
    (async () => {
      try {
        const url = process.env.REACT_APP_BOOKS_SERVER_URL;
        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(book),
          headers: { 'content-type': 'application/json' },
        });
        
        if(response.ok) {
          const data = await response.json();
          setBooks((curBooks) => [...curBooks, data]);
        } else {
          throw new Error(`Couldn't add the book "${book.title}"`);
        }
      } catch(error) {
        setError(convertToFetchError(error));
      }
    })();
  }, []);

  const filterBooks = useCallback(() => {
    setFilteredBooks(filter ? books.filter(book => book.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) :
      books);
  }, [filter, books]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);
  useEffect(() => { filterBooks(); }, [filterBooks]);

  function onConfirmDelete(confirm: boolean) {
    if(confirm && deleteDialog.book) {
      deleteBook(deleteDialog.book);
    }
    setDeleteDialog({ open: false, book: null});
  }

  function onSave(book: InputBook) {
    if('id' in book) {
      console.log('TODO: edit book: ', book);
    } else {
      addBook(book);
    }

    setFormDialog({ open: false, book: null });
  }

  return (
    <div className="App">
      {error && <ErrorMessage error={error} />}
      <Grid container
        direction='column'
        alignItems="center"
        paddingLeft={2}
        paddingRight={2}
        rowSpacing={2}>
        <Grid item width='100%'>
          <TextField
            label='filter books'
            value={filter}
            onChange={(e) => setFilter(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={10}>
          <List
            books={filteredBooks}
            onDelete={(book) => setDeleteDialog({ open: true, book })}
            onEdit={(book) => setFormDialog({ open: true, book})}/>
        </Grid>
        <Fab
          color='primary'
          sx={{ transform:'translateY(-50%)' }}
          onClick={() => setFormDialog({ open: true, book: null})}>
          <Add />
        </Fab>
      </Grid>

      <ConfirmDialog
        title='Confirm deletion'
        text={`Do you want remove "${deleteDialog.book?.title}"?`}
        open={deleteDialog.open}
        onConfirm={onConfirmDelete} />

      <FormDialog
        open={formDialog.open}
        book={formDialog.book}
        onSave={onSave}
        onClose={() => setFormDialog({ open: false, book: null })}/>
    </div>
  );
}

export default App;
