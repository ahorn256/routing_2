export type Book = {
  id: string,
  title: string,
  author: string,
  isbn: string,
  rating: number,  
};

export type InputBook = Omit<Book, 'id' |'rating'>;
