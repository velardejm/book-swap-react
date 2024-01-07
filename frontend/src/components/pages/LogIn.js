import { useState, useContext } from 'react';
import Logo from '../shared/Logo';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { logIn, updateForm } from '../../utils/helpers';
import { AuthContext } from '../../contexts/AuthContext';
import Form from '../forms/Form';

export default function LogIn() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  let { from } = state || { from: '/dashboard' };


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
      setIsLoggedIn(true);
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
      autofocus: false,
    },
  ];

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 py-5 pb-10 mt-10">
      <Logo />
      {isLoggedIn ? (
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
