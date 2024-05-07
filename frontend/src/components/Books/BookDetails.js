import { useState } from "react";

import EditBook from "../Forms/EditBook";
import Modal from "../Modal/Modal";

export default function BookDetails({ book, setBooks }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { id, title, author, genre, condition } = book;

  return (
    <div className="flex justify-between mb-5">
      <ul className="bg-green-300 text-left pl-5 mr-10">
        <li>Book Id: {id}</li>
        <li>Title: {title}</li>
        <li>Author: {author}</li>
      </ul>
      <ul className="bg-green-300 text-left pl-5 mr-5">
        <li>Genre: {genre}</li>
        <li>Condition: {condition}</li>
      </ul>
      <div>
        <button className="bg-orange-300  mr-2" onClick={() => setIsEditModalOpen(true)}>Edit</button>
        <button className="bg-red-300">Delete</button>
      </div>

      {isEditModalOpen ? <Modal setIsModalOpen={setIsEditModalOpen}>
        <EditBook book={book} setBooks={setBooks} />
      </Modal> : null}


    </div>
  );
}
