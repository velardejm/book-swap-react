import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import Dropdown from '../shared/Dropdown';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header/Header';

export default function SwapRequest() {
  const [bookToSwap, setBookToSwap] = useState(null);
  const { userId, bookId } = useParams();
  const { user } = useContext(AuthContext);

  const [data, setData] = useFetchData(
    `http://localhost:3001/swap/${userId}/${bookId}`
  );

  const navigate = useNavigate();

  if (!data) return null;
  const { requestedBook, bookOwner, userBooks } = data;

  console.log(data);

  const selectBookToSwap = (book) => {
    setBookToSwap(book);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bookToSwap === null) {
      alert('Please select a book to swap.');
      return;
    }

    const request = {
      requestedBookId: requestedBook.id,
      offerredBookId: bookToSwap.id,
      // requestedBookId: data.requestedBookDetails.bookId,
      // bookOwnerId: userId,
      // bookToSwapId: bookToSwap.bookId,
      requesterId: user.userId,
      // requester: user.name,
      // bookToSwap: bookToSwap,
      // requestedBook: data.requestedBookDetails,
    };

    const res = await fetch(
      `http://localhost:3001/swap/${user.userId}/${bookId}/${userId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    const { message } = await res.json();
    alert(message);
  };

  return (
    <div>
      <Header />
      <div className="w-1/2 m-auto">
        <h1>Swap Request Pages</h1>
        <div className="flex justify-between bg-blue-100 p-10">
          <div>
            <h2>Requested Book</h2>
            <ul>
              <li>Owner: {bookOwner}</li>
              <li>Book Title: {requestedBook.title}</li>
            </ul>
          </div>
          <div>
            <form method="POST" className="flex flex-col items-center">
              {user ? (
                <div>
                  <Dropdown
                    options={userBooks}
                    setterFunction={selectBookToSwap}
                  />
                </div>
              ) : null}
              <button
                className="btn bg-green-500 w-40 mt-5"
                type="submit"
                onClick={handleSubmit}
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
