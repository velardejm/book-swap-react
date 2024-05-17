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
      <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gray-100 px-5 md:px-20 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
          Buy, Sell, and Swap Your Books
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-14">
          Join BookSwap Today and Dive into a World Where Every Book Finds its
          Next Adventure. Be part of a passionate community of like-minded book
          lovers. Buy, sell, swap — and let stories unfold among fellow
          enthusiasts!
        </p>

        <div className="flex flex-col md:flex-row">
          {!isLoggedIn && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg md:text-xl py-3 px-6 rounded-full mb-4 md:mb-0 md:mr-4"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Join now!
            </button>
          )}

          <Link
            to="/books/listings"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg md:text-xl py-3 px-6 rounded-full"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {isSignUpModalOpen && <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />}
    </>
  );
}
