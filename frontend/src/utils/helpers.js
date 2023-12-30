export const signUp = (e, data) => {
  const { password, passwordConfirmation } = data;
  e.preventDefault();

  if (password !== passwordConfirmation) {
    alert('Incorrect password verification.');
  } else {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  alert('Registration Successful!');
};
