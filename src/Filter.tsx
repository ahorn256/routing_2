import React, { useState } from "react";
import { Book } from "./Book";

type Props = {
  books: Book[],
  setFilteredBooks: (books:Book[]) => void,
};

const Filter:React.FC<Props> = ({ books, setFilteredBooks }) => {
  const [ filter, setFilter ] = useState('');

  function handleFilter(value:string) {
    setFilter(value);
    setFilteredBooks(value ? books.filter(book => book.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())) :
      books);
  }

  return (
    <input type="text" value={filter} onChange={(e) => handleFilter(e.target.value)}/>
  );
}

export default Filter;
