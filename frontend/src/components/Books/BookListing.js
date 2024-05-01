import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Modal from '../Modal/Modal';
import SwapRequest from '../Forms/SwapRequest';

export default function BookListing({ book }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-green-200 mb-5 py-2">
      <p className="mr-20">{book.title}</p>
      <button
        className="text-blue-500"
        onClick={() => {
          if (isLoggedIn) {
            // navigate(`/swap/${user.userId}/${book.id}`);
            setIsModalOpen(true);
          } else {
            navigate('/login', { state: { from: '/books/listings' } });
          }
        }}
      >
        Swap
      </button>

      <SwapRequest />

      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen}>
        <h1>Swap Request</h1>
        <SwapRequest />
      </Modal> : null}


    </div>
  );
}
