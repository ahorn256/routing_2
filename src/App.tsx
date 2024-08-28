import { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import List from './List';
import { Book } from './Book';
import { convertToFetchError, IFetchError } from './FetchError';
import Filter from './Filter';
import ErrorMessage from './ErrorMessage';

function App() {
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ filter, setFilter ] = useState('');
  const [ filteredBooks, setFilteredBooks ] = useState<Book[]>([]);
  const [ error, setError ] = useState<IFetchError|null>(null);

  const fetchBooks = useCallback(() =>
    (async () => {
      try {
        const url = process.env.REACT_APP_BOOKS_SERVER_URL;

        if(!url) throw new Error('REACT_APP_BOOKS_SERVER_URL undefined');
        
        const response = await fetch(url);
        const data:Object[] = await response.json();
        setBooks(data.map(item => {
          return {
            title: 'title' in item ? String(item.title) : '',
            author: 'author' in item ? String(item.author) : '',
            isbn: 'isbn' in item ? String(item.isbn) : '',
            rating: 'rating' in item ? parseInt(String(item.rating)) : 0,
            id: 'id' in item ? parseInt(String(item.id)) : 0,
          }
        }));
      } catch(error) {
        setError(convertToFetchError(error));
      }
    })(), []);

  const deleteBook = useCallback((book: Book) =>
    (async () => {
      try {
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

  const filterBooks = useCallback(() => {
    setFilteredBooks(filter ? books.filter(book => book.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) :
      books);
  }, [filter, books]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);
  useEffect(() => { filterBooks(); }, [filterBooks]);

  return (
    <div className="App">
      {error && <ErrorMessage error={error} />}
      <Grid container
        justifyContent="center"
        paddingLeft={2}
        paddingRight={2}
        rowSpacing={2}>
        <Grid item width='100%'>
          <Filter filter={filter} setFilter={setFilter}/>
        </Grid>
        <Grid item xs={12} md={10}>
          <List books={filteredBooks} onDelete={deleteBook}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
