import { useCallback, useEffect, useState } from 'react';
import { Fab, Grid, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import List from './List';
import { Book } from './Book';
import { convertToFetchError, IFetchError } from '../FetchError';
import ErrorMessage from '../ErrorMessage';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function convertToBook(obj:unknown) {
  if(obj !== null && typeof obj === 'object') {
    return {
      title: 'title' in obj ? String(obj.title) : '',
      author: 'author' in obj ? String(obj.author) : '',
      isbn: 'isbn' in obj ? String(obj.isbn) : '',
      rating: 'rating' in obj ? parseInt(String(obj.rating)) : 0,
      id: 'id' in obj ? String(obj.id) : '',
    }
  } else {
    return {
      title: '',
      author: '',
      isbn: '',
      rating: 0,
      id: '',
    }
  }
}

function Books() {
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ filter, setFilter ] = useState('');
  const [ filteredBooks, setFilteredBooks ] = useState<Book[]>([]);
  const [ error, setError ] = useState<IFetchError|null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBooks = useCallback(() =>
    (async () => {
      try {
        setError(null);

        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');
        
        const response = await fetch(url);

        if(response.ok) {
          const data = await response.json();
          setBooks(data.map(convertToBook));
        } else {
          throw new Error(`Couldn't fetch books`);
        }
      } catch(error) {
        setError(convertToFetchError(error));
      }
    })(), []);

  const filterBooks = useCallback(() => {
    setFilteredBooks(filter ? books.filter(book => book.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) :
      books);
  }, [filter, books]);

  useEffect(() => { fetchBooks(); }, [location, fetchBooks]);
  useEffect(() => { filterBooks(); }, [filterBooks]);

  function onAdd() {
    navigate(`/books/new`);
  }

  function onEdit(book: Book) {
    navigate(`/books/edit/${book.id}`);
  }

  function onDelete(book: Book) {
    navigate(`/books/delete/${book.id}`);
  }

  return (
    <>
      {error && <ErrorMessage error={error} />}
      <Grid container
        direction='column'
        alignItems="center"
        paddingLeft={2}
        paddingRight={2}
        rowSpacing={2}
        data-testid='books-grid'>
        <Grid item width='100%'>
          <TextField
            label='filter books'
            value={filter}
            onChange={(e) => setFilter(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={10}>
          <List
            books={filteredBooks}
            onDelete={(book) => onDelete(book)}
            onEdit={(book) => onEdit(book)}/>
        </Grid>
        <Fab
          color='primary'
          sx={{ transform:'translateY(-50%)' }}
          onClick={onAdd}>
          <Add />
        </Fab>
      </Grid>

      <Outlet />
    </>
  );
}

export default Books;
