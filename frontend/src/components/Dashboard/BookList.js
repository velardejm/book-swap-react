import { useState } from 'react';

import BookDetails from '../shared/BookDetails';
import Modal from '../shared/Modal';
import AddBook from './AddBook';

import useFetchData from '../../hooks/useFetchData';

export default function BookList() {
  const [books, setBooks] = useFetchData('http://localhost:3001/books');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(books);

  return (
    // <div>
    //   <h1>Book List</h1>
    // </div>
    <div className="flex flex-col items-center mb-5 pb-5">
      <h1>Book Listing</h1>
      <div>
        {!books
          ? null
          : books.map((book, index) => {
              // return <BookDetails book={book} key={index} />;
              const { id, title, author, genre, condition } = book;
              return <p key={index}>{author}</p>;
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
        setData={setBooks}
      ></Modal>
    </div>
  );
}
