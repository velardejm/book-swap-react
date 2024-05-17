import BookListing from './BookListing';
import Header from '../../components/Header/Header';
import useFetchData from '../../hooks/useFetchData';

export default function BookListings() {
  const [bookListing, setBookListing] = useFetchData(
    'http://localhost:3001/books/listings'
  );

  if (bookListing === null) return null;

  return (
    <div className="container mx-auto py-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6 mt-6">Listings</h1>
      <ul>
        {bookListing.map((book) => (
          <li key={book.id}>
            <BookListing book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}