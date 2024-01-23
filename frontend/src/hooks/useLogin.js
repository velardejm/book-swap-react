// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContext';

const useLogin = (formData) => {
  // const { setIsLoggedIn } = useContext(AuthContext);

  const logIn = async () => {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.token) {
      // setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  return logIn;
};

export default useLogin;
