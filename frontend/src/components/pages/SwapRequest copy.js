import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import Dropdown from '../shared/Dropdown';
import { AuthContext } from '../../contexts/AuthContext';

export default function SwapRequest() {
  const [myBooks, setMyBooks] = useState(null);
  const [bookToSwap, setBookToSwap] = useState(null);

  const { owner, bookId } = useParams();
  const { user } = useContext(AuthContext);

  const [bookData] = useFetchData(
    `http://localhost:3001/swap/${owner}/${bookId}`
  );

  const navigate = useNavigate();

  const selectBookToSwap = (book) => {
    // const book = myBooks.find((book) => book.title === bookTitle);
    setBookToSwap(book);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      requestor: user.username,
      requestedBook: bookData,
      bookOwner: owner,
      bookToSwap: bookToSwap,
    };

    console.log(request);

    if (bookToSwap === null) {
      alert('Please select a book to swap.');
      return;
    }

    fetch(`http://localhost:3001/swap/${owner}/${bookId}/${user.username}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  };

  useEffect(() => {
    if (user) {
      if (user.username !== owner) {
        setMyBooks(user.booksAvailable);
      } else {
        alert('Please select other users');
        navigate('/books/listings');
      }
    }
  }, [user]);

  return (
    <div>
      <h1>Swap Request Pages</h1>
      <h2>Requested Book</h2>
      <ul>
        <li>Owner: {owner}</li>
        {bookData ? <li>Book Title: {bookData.title}</li> : null}
      </ul>

      <form method="POST">
        {user ? (
          <div>
            <Dropdown
              options={user.booksAvailable}
              setterFunction={selectBookToSwap}
            />
          </div>
        ) : null}

        {/* Field to enter any cash amount that could be offerred in addition the the above. */}
        {/* Allow radio for buy only option */}
        {/* TODO
            1. Fetch login user data
            2. Show user's  list of books in a dropdown list
            3. Send a post request to send the request to the owner of the book. 
            Authentication is required to allow adding the swap request to the book owner's data.
            Only up to three requests can be made by one user to another user at a time.
            Previous requests must be resolved before further requests could be made.
            4. Update dashboard to show a section of requests made.
            This is to be expanded further to show new, pending, rejected, and completed requests  */}
        <button type="submit" onClick={handleSubmit}>
          Send Request
        </button>
      </form>
    </div>
  );
}
