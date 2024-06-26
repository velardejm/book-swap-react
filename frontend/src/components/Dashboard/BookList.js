import { useState } from 'react';

import BookDetails from '../Books/BookDetails';
import Modal from '../shared/Modal';
import AddBook from './AddBook';

import useFetchData from '../../hooks/useFetchData';

export default function BookList({ books, setBooks }) {
  // const [books, setBooks] = useFetchData('http://localhost:3001/books');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center mb-5 pb-5">
      <h1>Book Listing</h1>
      <div>
        {!books
          ? null
          : books.map((book, index) => {
              return <BookDetails book={book} key={book.id} />;
            })}
      </div>
      <button
        className={`btn bg-blue-500 w-28 self-center mt-2`}
        type="submit"
        onClick={() => setIsModalOpen(true)}
      >
        Add Book
      </button>
      <Modal
        component={AddBook}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        data={books}
        setData={(data) => setBooks(data)}
      ></Modal>
    </div>
  );
}
