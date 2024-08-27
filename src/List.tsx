import React, { useCallback, useEffect, useState } from "react";
import { Book } from "./Book";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

type Props = {
  books: Book[],
};

type SortIn = keyof Book;
type SortDirection = 'asc' | 'desc';

type Sort = {
  orderBy: SortIn,
  order: SortDirection,
}

const tableHead = {
  title: 'Title',
  author: 'Author',
  isbn: 'ISBN',
  rating: 'Bewertung',
};

const List: React.FC<Props> = ({books}) => {
  const [ sort, setSort ] = useState<Sort>({
    orderBy: 'title',
    order: 'asc',
  });
  const [ sortedBooks, setSortedBooks ] = useState<Book[]>([]);

  const doSort = useCallback(() => {
    setSortedBooks(curBooks => ([...curBooks].sort(
      (b1, b2) => {
        const res = b1[sort.orderBy].toString().localeCompare(b2[sort.orderBy].toString());
        return sort.order === 'asc' ? res : -res;
      })
    ));
  }, [sort]);

  useEffect(() => {
    setSortedBooks(books);
    doSort();
  }, [books, doSort]);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {Object.entries(tableHead).map(([key, head]) => (
              <TableCell key={key}>
                {head}
                <TableSortLabel
                  active={sort.orderBy === head}
                  direction={sort.order}
                  onClick={() => {
                    setSort({
                      orderBy: key as SortIn,
                      order: sort.order === 'asc' ? 'desc' : 'asc'
                    });
                  }} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBooks.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{Array(5).fill(0).map((item, index) => index < book.rating ? <Star key={index} /> : <StarBorder key={index} />)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default List;
