// import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import useFetchData from '../../hooks/useFetchData';

export default function BookListings() {
  const [usersData, setUsersData] = useFetchData(
    'http://localhost:3001/books/listings'
  );

  // const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const handleClick = async (url) => {
    console.log(url);
    if (isLoggedIn) {
      navigate(url);
    } else {
      navigate('/login', { state: { from: '/books/listings' } });
    }
  };

  // if (!user && user !== null) return null;

  if (!usersData) return null;

  const listingsComponent = usersData.map(
    ({ userId, name, booksAvailable }, index) => {
      return (
        <div key={index}>
          {user ? user.userId === userId ? null : <p>{name}</p> : <p>{name}</p>}
          <ul className="mx-3">
            {booksAvailable.map((book, index) => {
              if (user) {
                if (user.userId === userId) return null;
              }

              return (
                <li key={index}>
                  <p>
                    {book.title}
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        // handleClick(`/swap/${owner}/${book.bookId}`);
                        handleClick(`/swap/${userId}/${book.bookId}`);
                      }}
                    >
                      Swap
                    </button>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  );

  return <div>{listingsComponent}</div>;
}
