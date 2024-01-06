import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookListings() {
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/listings', {
        method: 'GET',
      });
      const data = await response.json();
      setListings(data.response);
    };

    fetchData();
  }, []);

  const navigateToAuthRoute = (url) => {
    navigate('/login', { state: { from: url } });
  };

  return (
    <div>
      {listings.map(({ user, listings }, index) => {
        return (
          <div key={index}>
            <h1>{user}</h1>
            <ul className="mx-3">
              {listings.map((book, index) => {
                return (
                  <li key={index}>
                    <p>
                      {book.title}{' '}
                      <button
                        className="text-blue-500"
                        onClick={() =>
                          navigateToAuthRoute(`/swap/${user}/${book.bookId}`)
                        }
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
      })}
    </div>
  );
}
