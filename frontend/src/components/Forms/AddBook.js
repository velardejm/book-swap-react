import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../Common/FormInput';
import { updateForm } from '../../utils/helpers';


// export default function AddBook({ closeModal, data, setData }) {
  export default function AddBook({books, setBooks}) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/books/new', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      const { data } = await res.json();
      setBooks(data);
    }
    alert("Add book submitted");

  };

  return (
    <form
      method="post"
      className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold py-10 text-center">Add Book</h1>

      <FormInput
        label="Title:"
        type="text"
        name="title"
        onChangeHandler={handleChange}
        autofocus={true}
        data={formData.title}
      />

      <FormInput
        label="Author:"
        type="text"
        name="author"
        onChangeHandler={handleChange}
        autofocus={false}
        data={formData.author}
      />

      <FormInput
        label="Genre:"
        type="text"
        name="genre"
        onChangeHandler={handleChange}
        autofocus={false}
        data={formData.genre}
      />

      <FormInput
        label="Condition:"
        type="text"
        name="condition"
        onChangeHandler={handleChange}
        autofocus={false}
        data={formData.condition}
      />

      <button className={`btn bg-blue-500 w-28 self-center mt-2`} type="submit">
        Submit
      </button>
    </form>
  );
}
