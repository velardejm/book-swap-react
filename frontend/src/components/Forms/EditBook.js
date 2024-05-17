import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../Common/FormInput';
import { updateForm } from '../../utils/helpers';

// export default function AddBook({ closeModal, data, setData }) {
export default function EditBook({ book, setBooks, setIsModalOpen }) {
  const { id, title, author, genre, condition } = book;
  const [formData, setFormData] = useState({
    title: title,
    author: author,
    genre: genre,
    condition: condition,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/books/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      const { data } = await res.json();
      alert('Book saved successfully.');
      setBooks(data);
    }
    setIsModalOpen(false);
  };

  return (
    <form
      method="post"
      className="items-center pb-10 mt-10"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold py-10 text-center">Edit Book</h1>

      <FormInput
        label="Title:"
        type="text"
        name="title"
        onChangeHandler={handleChange}
        value={title}
        autofocus={true}
        data={formData.title}
      />

      <FormInput
        label="Author:"
        type="text"
        name="author"
        onChangeHandler={handleChange}
        value={author}
        autofocus={false}
        data={formData.author}
      />

      <FormInput
        label="Genre:"
        type="text"
        name="genre"
        onChangeHandler={handleChange}
        value={genre}
        autofocus={false}
        data={formData.genre}
      />

      <FormInput
        label="Condition:"
        type="text"
        name="condition"
        onChangeHandler={handleChange}
        value={condition}
        autofocus={false}
        data={formData.condition}
      />

      <button className={`btn bg-blue-500 w-28 self-center mt-2`} type="submit">
        Update
      </button>

      <button
        className={`btn bg-red-500 w-28 self-center mt-2`}
        type="button"
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
}
