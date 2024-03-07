import { useState, useContext } from 'react';
import Logo from '../Header/Logo';
import { updateForm } from '../../utils/helpers';
import FormInput from '../shared/FormInput';
import useGetPreviousRoute from '../../hooks/useGetPreviousRoute';
import { AuthContext } from '../../contexts/AuthContext';
// import useLogin from '../../hooks/useLogin';

export default function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [from, navigate] = useGetPreviousRoute();
  const { isLoggedIn, setIsLoggedIn, logIn, user } = useContext(AuthContext);

  // const logIn = useLogin(formData);

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await logIn(formData);
    if (userData) {
      setIsLoggedIn(true);
      // navigate(from);
      navigate('/');
    }
  };

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 py-5 pb-10 mt-10">
      <Logo />
      {isLoggedIn ? (
        <p className="font-bold text-2xl text-center px-5 my-20">
          You are already logged in as
        </p>
      ) : (
        <>
          <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold py-10 text-center">Log In</h1>

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
        </>
      )}
    </div>
  );
}
