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
    <div className="flex justify-between items-center bg-green-200 rounded-lg p-4 mb-4">
      <p className="text-lg font-semibold">{book.title}</p>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => {
          if (isLoggedIn) {
            setIsModalOpen(true);
          } else {
            navigate('/login', { state: { from: '/books/listings' } });
          }
        }}
      >
        Swap
      </button>

      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <h1 className="text-2xl font-semibold mb-4">Swap Request</h1>
          <SwapRequest user={user} userId={user.userId} bookId={book.id} />
        </Modal>
      )}
    </div>
  );
}
