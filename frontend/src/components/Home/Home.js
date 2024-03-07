import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import Header from '../Header/Header';

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="flex flex-col justify-center items-center text-center h-[85vh] bg-blue-200 px-5">
        <h1 className="text-6xl font-bold mb-5">
          Buy, Sell, and Swap Your Books
        </h1>
        <p className="text-md mb-5">
          Join BookSwap Today and Dive into a World Where Every Book Finds its
          Next Adventure. Be part of a passionate community of like-minded book
          lovers. Buy, sell, swap — and let stories unfold among fellow
          enthusiasts!
        </p>

        <div>
          {isLoggedIn ? null : (
            <Link
              to="/signup"
              className="bg-orange-500 text-white font-bold text-lg p-2 rounded-md w-32 mr-4"
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
    </>
  );
}
