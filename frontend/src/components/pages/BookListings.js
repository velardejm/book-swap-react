import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function BookListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

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

  const listingsComponent = listings.map(({ user, listings }, index) => {
    return (
      <div key={index}>
        <h1>{user}</h1>
        <ul className="mx-3">
          {listings.map((book, index) => {
            return (
              <li key={index}>
                <p>
                  {book.title}
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      handleClick(`/swap/${user}/${book.bookId}`);
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
