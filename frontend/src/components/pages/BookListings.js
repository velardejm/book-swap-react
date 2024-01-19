import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function BookListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/books/listings', {
        method: 'GET',
      });
      const { data } = await response.json();
      setListings(data);
    };

    fetchData();
  }, []);

  const handleClick = async (url) => {
    if (isLoggedIn) {
      navigate(url);
    } else {
      navigate('/login', { state: { from: url } });
    }
  };

  
  if (!user && user !== null) return null;

  const listingsComponent = listings.map(({ owner, books }, index) => {
    return (
      <div key={index}>
        {user ? (owner === user.username ? null : owner) : owner}
        <ul className="mx-3">
          {books.map((book, index) => {
            if (user) {
              if (owner === user.username) return null;
            }

            return (
              <li key={index}>
                <p>
                  {book.title}
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      handleClick(`/swap/${owner}/${book.bookId}`);
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
