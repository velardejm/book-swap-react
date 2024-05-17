import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Common/FormInput';

export default function SignUpP2({ formData, handleChange, setSignUpPage }) {
  const { password, passwordConfirmation } = formData;
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password && passwordConfirmation) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === passwordConfirmation) {
      // sign up logic

      try {
        const response = await fetch('http://localhost:3001/account/signup/2', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 400) {
          alert('Username or E-mail already exists');
          // return false;
        } else {
          alert('Registration Successful!');
          // return true;
          navigate('/books/listings', { replace: true });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Incorrect password verification.');
    }
  };

  return (
    <div>
      <form>
        <FormInput
          label="Password:"
          type="password"
          name="password"
          onChangeHandler={handleChange}
          autofocus={false}
        />

        <FormInput
          label="Password Confirmation:"
          type="password"
          name="passwordConfirmation"
          onChangeHandler={handleChange}
          autofocus={false}
        />

        <div className='flex flex-col'>
          <button
            className={`btn bg-orange-500 w-28 self-center mt-2`}
            type="button"
            onClick={() => setSignUpPage(1)}
          >
            Back
          </button>

          <button
            className={`btn bg-blue-500 w-28 self-center mt-2 ${
              isSubmitEnabled ? '' : 'bg-gray-500'
            }`}
            type="submit"
            disabled={!isSubmitEnabled}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
