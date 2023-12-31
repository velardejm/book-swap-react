import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookDetails from '../shared/BookDetails';
import Modal from '../shared/Modal';
import AddBook from './AddBook';

const MyComponent = () => {
  return (
    <div>Test</div>
  )
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [data] = useFetchData('http://localhost:3001/dashboard');

  const closeModal = () => {
    setIsModalOpen(false);
  }

  if (!data) {
    return null;
  }

  const { name, username, email, booksAvailable } = data;
  return (
    <div className="bg-blue-200 flex flex-col items-center mb-5 pb-5">
      <h1 className="font-bold text-2xl">Welcome {name}</h1>
      <p>{`Username: ${username} | email: ${email} `}</p>
      <h2 className="flex-start">Book Listing</h2>
      <div>
        {booksAvailable.map((book, index) => {
          return <BookDetails book={book} key={index} />;
        })}
      </div>

      <button className={`btn bg-blue-500 w-28 self-center mt-2`} type="submit" onClick={() => setIsModalOpen(true)}>
        Add Book
      </button>

      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <AddBook />
      </Modal>
    </div>
  );
}
