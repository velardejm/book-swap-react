import { useState } from 'react';
import FormInput from '../shared/FormInput';
import { updateForm } from '../../utils/helpers';

export default function AddBook() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    condition: '',
  });

  const handleChange = (e) => {
    updateForm(e, setFormData);
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    fetch('http://localhost:3001/book', {
      method:'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    


    

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
      />

      <FormInput
        label="Author:"
        type="text"
        name="author"
        onChangeHandler={handleChange}
        autofocus={false}
      />

      <FormInput
        label="Genre:"
        type="text"
        name="genre"
        onChangeHandler={handleChange}
        autofocus={false}
      />

      <FormInput
        label="Condition:"
        type="text"
        name="condition"
        onChangeHandler={handleChange}
        autofocus={false}
      />

      <button className={`btn bg-blue-500 w-28 self-center mt-2`} type="submit">
        Submit
      </button>
    </form>
  );
}
