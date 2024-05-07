import { useState } from 'react';

import BookDetails from '../../components/Books/BookDetails';
import Modal from '../../components/Modal/Modal';
import AddBook from '../../components/Forms/AddBook';

import useFetchData from '../../hooks/useFetchData';

export default function BookList() {
  const [books, setBooks] = useFetchData('http://localhost:3001/books/mybooks');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center mb-5 pb-5">
      <h1>My Books</h1>
      <div>
        {!books
          ? null
          : books.map((book, index) => {
            return <BookDetails book={book} key={book.id} setBooks={setBooks} />;
          })}
      </div>

      <button
        className={`btn bg-blue-500 w-28 self-center mt-2`}
        type="submit"
        onClick={() => setIsModalOpen(true)}
      >
        Add Book
      </button>

      {/* <Modal
        component={AddBook}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        data={books}
        setData={(data) => setBooks(data)}
      ></Modal> */}

      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen}>
        <AddBook books={books} setBooks={setBooks}/>
      </Modal> : null}

    </div>
  );
}
