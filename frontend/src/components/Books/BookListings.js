import BookListing from './BookListing';
import Header from '../../components/Header/Header';

import useFetchData from '../../hooks/useFetchData';

export default function BookListings() {
  const [bookListing, setBookListing] = useFetchData(
    'http://localhost:3001/books/listings'
  );

  console.log(bookListing);

  if (bookListing === null) return;

  return (
    <div>
      <Header />
      <h1>Listings</h1>
      <ul>
        {bookListing.map((book) => {
          return (
            <li key={book.id}>
              <BookListing book={book} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
