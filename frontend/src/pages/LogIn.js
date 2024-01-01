import FormInput from './FormInput';
import { useState } from 'react';
import { updateForm } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/protected');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10">
      {localStorage.getItem('token') ? (
        <p className='font-bold text-2xl text-center px-5 my-20'>You are already logged in.</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold py-10 text-center">Log In</h1>
          <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
            <FormInput
              label="Username:"
              type="text"
              name="username"
              onChangeHandler={handleChange}
              autofocus={true}
            />
            <FormInput
              label="Password:"
              type="password"
              name="password"
              onChangeHandler={handleChange}
            />
            <button
              className={`btn btn-primary w-28 self-center mt-2`}
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
