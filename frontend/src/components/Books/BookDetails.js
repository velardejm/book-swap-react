export default function BookDetails({ book }) {
  const { id, title, author, genre, condition } = book;

  return (
    <div className="flex justify-between w-screen mb-5">
      <ul className="bg-green-300 w-1/2 text-left pl-5">
        <li>Book Id: {id}</li>
        <li>Title: {title}</li>
        <li>Author: {author}</li>
      </ul>
      <ul className="bg-green-300 w-1/2 text-left pl-5">
        <li>Genre: {genre}</li>
        <li>Condition: {condition}</li>
      </ul>
    </div>
  );
}
