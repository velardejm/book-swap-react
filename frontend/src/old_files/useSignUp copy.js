const useSignUp = () => {
  const signUp = async ({ passwordConfirmation, ...registrationData }) => {
    try {
      const { password } = registrationData;
      if (password !== passwordConfirmation) {
        alert('Incorrect password verification.');
      } else {
        const response = await fetch('http://localhost:3001/account/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        if (response.status === 400) {
          alert('Username or E-mail already exists');
          return false;
        } else {
          alert('Registration Successful!');
          return true;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return signUp;
};

export default useSignUp;
