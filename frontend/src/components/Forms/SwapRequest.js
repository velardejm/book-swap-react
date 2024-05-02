import { useState, useEffect, useContext } from 'react';
import useFetchData from '../../hooks/useFetchData';
import Dropdown from '../Common/Dropdown';
import { AuthContext } from '../../contexts/AuthContext';


export default function SwapRequest({ userId, bookId }) {
  const [bookToSwap, setBookToSwap] = useState(null);
  const { user } = useContext(AuthContext);

  const [data, setData] = useFetchData(
    `http://localhost:3001/swap/request/${bookId}`
  );
  if (!data) return null;

  const { requestedBook, bookOwner, userBooks } = data;

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
      requesterId: user.userId,
    };

    const res = await fetch(
      `http://localhost:3001/swap/submit-request`,
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
          <hr></hr>
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
