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
    <div className="flex justify-between mb-5">
      <ul className="text-left pl-5 w-[80vw]">
        <li>Book Id: {id}</li>
        <li>Title: {title}</li>
        <li>Author: {author}</li>
        <li>Genre: {genre}</li>
        <li>Condition: {condition}</li>
      </ul>
      <div>
        <button
          className="bg-orange-300  mr-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-300"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
      </div>

      {isEditModalOpen ? (
        <Modal setIsModalOpen={setIsEditModalOpen}>
          <EditBook book={book} setBooks={setBooks} setIsModalOpen={setIsEditModalOpen}/>
        </Modal>
      ) : null}

      {isDeleteModalOpen ? (
        <ConfirmationModal
          message={'Are you sure you want to delete this book?'}
          setIsModalOpen={setIsDeleteModalOpen}
          confirm={deleteBookHandler}
        />
      ) : null}
    </div>
  );
}
