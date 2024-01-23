// import { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import useFetchData from '../../hooks/useFetchData';

export default function BookListings() {
  const [usersData, setUsersData] = useFetchData(
    'http://localhost:3001/books/listings'
  );

  // const [listings, setListings] = useState([]);
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:3001/books/listings', {
  //       method: 'GET',
  //     });
  //     const { data } = await response.json();
  //     setListings(data);
  //   };

  //   fetchData();
  // }, []);

  // const handleClick = async (url) => {
  //   if (isLoggedIn) {
  //     navigate(url);
  //   } else {
  //     navigate('/login', { state: { from: url } });
  //   }
  // };

  // if (!user && user !== null) return null;

  if (!usersData) return null;

  const listingsComponent = usersData.map(({ userId, name, booksAvailable }, index) => {
    return (
      <div key={index}>
        {user ? (user.userId === userId ? null : <p>{name}</p>) : <p>{name}</p>}
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
  });

  return <div>{listingsComponent}</div>;
}
