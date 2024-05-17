import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeaderDropdown({ ...props }) {
  
  const {
    setisLogOutPromptOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    isLoggedIn,
  } = props;

  return (
    <div className={`relative ${!isLoggedIn ? 'hidden' : ''}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-gray-500 hover:text-orange-200 focus:outline-none focus:text-gray-50 transition duration-150 ease-in-out"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          onClick={() => setIsDropdownOpen(false)}
        >
          {isLoggedIn && (
            <>
              <Link
                to="/user/mybooks"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                My Books
              </Link>
              <Link
                to="/user/requests"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Swap Requests
              </Link>
              <Link
                to="/user/sent-requests"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Sent Requests
              </Link>
              <hr></hr>
              {/* <Link
                to="/user"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Dashboard
              </Link> */}

              <Link
                to="/books/listings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setisLogOutPromptOpen(true)}
              >
                Listings
              </Link>
              <hr></hr>
              <Link
                to="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setisLogOutPromptOpen(true)}
              >
                Log Out
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
