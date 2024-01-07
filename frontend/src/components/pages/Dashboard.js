import useFetchData from '../../hooks/useFetchData';
import BookDetails from '../shared/BookDetails';

export default function Dashboard() {
  const [data] = useFetchData('http://localhost:3001/dashboard');

  if (!data) {
    return null;
  }

  const { name, username, email, booksAvailable } = data;
  return (
    <div className="bg-blue-200 flex flex-col items-center mb-5">
      <h1 className="font-bold text-2xl">Welcome {name}</h1>
      <p>{`Username: ${username} | email: ${email} `}</p>
      <h2 className="flex-start">Book Listing</h2>
      <div>
        {
            booksAvailable.map((book, index) => {
                return <BookDetails book={book} key={index} />
            })
        }
      </div>
    </div>
  );
}
