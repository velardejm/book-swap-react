import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logIn, updateForm } from '../../utils/helpers';
import FormInput from '../shared/FormInput';
import { AuthContext } from '../../contexts/AuthContext';


export default function LoginModal({ isLoginOpen, closeLoginModal }) {
  useEffect(() => {
    const handleEscape = () => {

    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    }

  }, [])

  const { isLoggedIn, contextLogIn } = useContext(AuthContext);

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
    const isLoginSuccessful = await logIn(
      formData,
      'http://localhost:3001/login'
    );

    if (isLoginSuccessful) {
      contextLogIn();
      closeLoginModal();
      navigate('/');
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

  if (!isLoginOpen) {
    return null;
  }

  return (
    <div
      id="parent-div"
      onClick={(e) => {
        if (e.target.id == 'parent-div') {
          closeLoginModal();
        }
      }}
      className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center"
    >
      <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10">
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
            autofocus={false}
          />

          <button
            className={`btn bg-blue-500 w-28 self-center mt-2`}
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>


    </div>
  );
}
