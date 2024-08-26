import { useEffect, useState } from 'react';
import './App.css';
import List from './List';
import { Book } from './Book';
import IFetchError from './IFetchError';

function App() {
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ error, setError ] = useState<IFetchError|null>(null);

  useEffect(() => {
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
        if(error instanceof Error) {
          setError({ message: error.message });
        } else if(error !== null && typeof error === 'object' && 'message' in error) {
          setError(error as IFetchError);
        } else {
          setError({ message: 'unknown error' });
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      {error && (
        <>
          <h3>Error</h3>
          <p>{error.message}</p>
        </>
      )}
      <List books={books}/>
    </div>
  );
}

export default App;
