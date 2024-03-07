import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const authenticate = async () => {
        const res = await fetch('http://localhost:3001/users/authenticate', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        });

        if (res.status === 200) {
          const responseObject = await res.json();
          setIsLoggedIn(true);
          setUser(responseObject.data);
          console.log(user);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
        }
      };

      authenticate();
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const logIn = async (formData) => {
    const res = await fetch('http://localhost:3001/account/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logIn, logOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
