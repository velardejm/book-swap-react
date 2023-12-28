import { useEffect, useState } from 'react';

import FormInput from './FormInput';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    const { password, passwordConfirmation } = formData;
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Password verification mismatch.');
    }
    console.log(formData);
  };

  useEffect(() => {
    const { name, email, username, password, passwordConfirmation } = formData;
    if(name && email && username && password && passwordConfirmation) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }

  }, [formData]);

  return (
    <div className="flex flex-col items-center bg-blue-200 mx-5 px-5 pb-10 mt-10">
      <h1 className="text-3xl font-bold py-10 text-center">
        Create Book Swap Account
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <FormInput
          label="Name:"
          type="text"
          name="name"
          onChangeHandler={handleChange}
        />
        <FormInput
          label="E-mail:"
          type="email"
          name="email"
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Username:"
          type="text"
          name="username"
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Password:"
          type="password"
          name="password"
          onChangeHandler={handleChange}
        />
        <FormInput
          label="Confirm Password:"
          type="password"
          name="passwordConfirmation"
          onChangeHandler={handleChange}
        />
        <button
          className={`btn btn-primary w-28 self-center ${
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
