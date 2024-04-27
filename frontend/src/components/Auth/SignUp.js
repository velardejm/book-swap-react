import { useEffect, useState } from 'react';
import { updateForm } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/Common/FormInput';
import Logo from '../Header/Logo';
import useSignUp from '../../hooks/useSignUp';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const signUp = useSignUp();
  const navigate = useNavigate();
  const { name, email, username, password, passwordConfirmation } = formData;

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const successfulSignUp = await signUp(formData);
    if (successfulSignUp) {
    }
  };

  useEffect(() => {
    if (name && email && username && password && passwordConfirmation) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [formData]);

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 py-5 pb-10 mt-10">
      <Logo />
      <h1 className="text-3xl font-bold py-10 text-center">
        Create Book Swap Account
      </h1>
      <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          label="Name:"
          type="text"
          name="name"
          value={name}
          onChangeHandler={handleChange}
          autofocus={true}
        />
        <FormInput
          label="E-mail:"
          type="email"
          name="email"
          value={email}
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Username:"
          type="text"
          name="username"
          value={username}
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Password:"
          type="password"
          name="password"
          value={password}
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Confirm Password:"
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChangeHandler={handleChange}
        />
        <button
          className={`btn bg-blue-500 w-28 self-center ${
            submitEnabled ? '' : 'bg-gray-500'
          }`}
          type="submit"
          disabled={!submitEnabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
