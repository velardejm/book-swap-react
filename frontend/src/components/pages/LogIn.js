import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logIn, updateForm } from '../../utils/helpers';
import useVerifyToken from '../../hooks/useVerifyToken';
import Form from '../forms/Form';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [component, setComponent] = useState(<></>);

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  let { from } = state || { from: '/' };

  const isTokenValid = useVerifyToken();

  useEffect(() => {
    const loginForm = (
      <>
        <h1 className="text-3xl font-bold py-10 text-center">Log In</h1>

        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formFields={formFields}
        />
      </>
    );

    const loggedInComponent = (
      <p className="font-bold text-2xl text-center px-5 my-20">
        You are already logged in.
      </p>
    );

    if (isTokenValid) {
      setComponent(loginForm);
    } else {
      setComponent(loggedInComponent);
    }
  }, []);

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLoginSuccessful = await logIn(
      formData,
      'http://localhost:3001/login'
    );
    if (isLoginSuccessful) {
      navigate(from);
    }
  };

  const formFields = [
    {
      label: 'Username:',
      type: 'text',
      name: 'username',
      autofocus: true,
    },
    {
      label: 'Password:',
      type: 'password',
      name: 'password',
      autofocus: true,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10">
      {localStorage.getItem('token') ? (
        <p className="font-bold text-2xl text-center px-5 my-20">
          You are already logged in.
        </p>
      ) : (
        <>
          <h1 className="text-3xl font-bold py-10 text-center">Log In</h1>

          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formFields={formFields}
          />
        </>
      )}
    </div>
  );
}
