import { useState, useContext } from 'react';
import Logo from '../shared/Logo';
import { updateForm } from '../../utils/helpers';
import FormInput from '../shared/FormInput';
import useGetPreviousRoute from '../../hooks/useGetPreviousRoute';
import { AuthContext } from '../../contexts/AuthContext';
import useLogin from '../../hooks/useLogin';
import useAuthContext from '../../hooks/useAuthContext';

export default function LogIn() {
  // const [isLoggedIn, logIn] = useAuthContext();
  const { isLoggedIn } = useContext(AuthContext);
  const [from, navigate] = useGetPreviousRoute();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // console.log(from);

  const handleLogIn = useLogin(formData);

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoginSuccessful = await handleLogIn();
    if (isLoginSuccessful) {
      navigate(from);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 py-5 pb-10 mt-10">
      <Logo />
      {isLoggedIn ? (
        <p className="font-bold text-2xl text-center px-5 my-20">
          You are already logged in.
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
