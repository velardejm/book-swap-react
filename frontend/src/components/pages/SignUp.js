import { useEffect, useState } from 'react';
import { updateForm, signUp } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import FormInput from '../shared/FormInput';
import Logo from '../shared/Logo';

export default function SignUp() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const navigate = useNavigate();
  const { passwordConfirmation, ...registrationData } = formData;
  const {name, email, username, password} = registrationData

  const handleChange = (e) => {
    updateForm(e, setFormData);
  };

  const handleSubmit = async (e) => {

    /*
    TODO
    1. Handle conflicts
    2. Find out how to perform multiple queries (roll back if a query fails) - serch: supabase transactions
    */

    e.preventDefault();
    signUp(passwordConfirmation, registrationData);


    // try {
    //   const { data: newUserData, error: addUserError } = await supabase.from('users')
    //     .upsert({ username: username, password: password })
    //     .select('id');

    //     const newUserId = newUserData[0].id;

    //     console.log(newUserId);

    //   if (addUserError) throw addUserError;

    //   const { error: addUserDetailsError } = await supabase
    //     .from('usersinfo')
    //     .insert({ 'id': newUserId, 'name': name, 'email': email, 'user_id': newUserId });

    //   if(addUserDetailsError) {
    //     const {error: userDeleteError} = await supabase.from('users').delete().eq('id', newUserId);
    //     if(userDeleteError) throw userDeleteError;
    //     throw addUserDetailsError;
    //   }

    //   alert("Signed up successfully.");

    // } catch (error) {
    //   alert("Sign up failed.")
    //   console.log(error);
    // }



    // await supabase.rpc('COMMIT');
    // alert('Sign up succesful!');



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
          className={`btn bg-blue-500 w-28 self-center ${submitEnabled ? '' : 'bg-gray-500'
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
