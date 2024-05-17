import { useState } from 'react';
import BookDetails from '../../components/Books/BookDetails';
import Modal from '../../components/Modal/Modal';
import AddBook from '../../components/Forms/AddBook';
import useFetchData from '../../hooks/useFetchData';

export default function BookList() {
  const [books, setBooks] = useFetchData('http://localhost:3001/books/mybooks');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!books ? null : books.map((book, index) => (
          <BookDetails book={book} key={book.id} setBooks={setBooks} />
        ))}
      </div>

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-8"
        onClick={() => setIsModalOpen(true)}
      >
        Add Book
      </button>

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <AddBook books={books} setBooks={setBooks} />
        </Modal>
      )}
    </div>
  );
}
