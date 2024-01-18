import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BookDetails from '../shared/BookDetails';
import Modal from '../shared/Modal';
import AddBook from './AddBook';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useFetchData('http://localhost:3001/users/dashboard');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateData = (newData) => {
    setData(newData);
  };

  if (!data) {
    return null;
  }

  const { name, username, email, booksAvailable, incomingSwapRequests } = data;
  return (
    <div className="bg-blue-200 flex flex-col items-center mb-5 pb-5">
      <h1 className="font-bold text-2xl">Welcome {name}</h1>
      <p>You have {incomingSwapRequests.count} swap requests.</p>
      <p>{`Username: ${username} | email: ${email} `}</p>
      <h2 className="flex-start">Book Listing</h2>
      <div>
        {booksAvailable.map((book, index) => {
          return <BookDetails book={book} key={index} />;
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
        closeModal={closeModal}
        data={data}
        setData={setData}
      >
        {/* <AddBook /> */}
      </Modal>
    </div>
  );
}
