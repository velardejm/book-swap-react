import { useState } from 'react';
import EditBook from '../Forms/EditBook';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../Modal/ConfirmationModal';

export default function BookDetails({ book, setBooks }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id, title, author, genre, condition } = book;

  const deleteBookHandler = async () => {
    const res = await fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      const { data } = await res.json();
      alert('Book deleted successfully.');
      setBooks(data);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center mb-5">
      <div className="w-3/4 text-left">
        <p className="font-bold">Book Id: {id}</p>
        <p>Title: {title}</p>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Condition: {condition}</p>
      </div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {isEditModalOpen && (
        <Modal setIsModalOpen={setIsEditModalOpen}>
          <EditBook book={book} setBooks={setBooks} setIsModalOpen={setIsEditModalOpen} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          message={'Are you sure you want to delete this book?'}
          setIsModalOpen={setIsDeleteModalOpen}
          confirm={deleteBookHandler}
        />
      )}
    </div>
  );
}
