import SignUpModal from '../components/Modal/SignUpModal/SignUpModal';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import Header from '../components/Header/Header';

export default function Home() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center text-center h-[85vh] bg-blue-200 px-5">
        <h1 className="text-4xl font-bold mb-8">
          Buy, Sell, and Swap Your Books
        </h1>
        <p className="text-sm mb-14">
          Join BookSwap Today and Dive into a World Where Every Book Finds its
          Next Adventure. Be part of a passionate community of like-minded book
          lovers. Buy, sell, swap — and let stories unfold among fellow
          enthusiasts!
        </p>

        <div>
          {isLoggedIn ? null : (
            <Link
              to="/"
              className="bg-orange-500 text-white font-bold text-lg p-2 rounded-md w-32 mr-4"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Join now!
            </Link>
          )}

          <Link
            to="/books/listings"
            className="bg-green-500 text-white font-bold text-lg p-2 rounded-md w-32 ml-4"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {isSignUpModalOpen ? (
        <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />
      ) : null}
    </>
  );
}
