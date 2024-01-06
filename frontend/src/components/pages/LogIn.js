// import FormInput from './FormInput';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateForm } from '../../utils/helpers';
import { logIn } from '../../utils/helpers';
import Form from '../forms/Form';
import { AuthContext } from '../../contexts/AuthContext';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const { from } = state || { from: '/' };
  

  useEffect(() => {

    const checkIsLoggedIn = async () => {
      const res = await fetch('http://localhost:3001/check-session', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(res.status !== 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      
    }

    checkIsLoggedIn();

  }, [isLoggedIn])

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
