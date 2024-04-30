import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, authenticate } = useContext(AuthContext);

  let component = null;

  useEffect(() => {
    if (isLoggedIn !== null) {
      console.log('loaded');
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoading === false) {
      console.log('test');
      component = isLoggedIn ? <>{children}</> : <Navigate to="/" />
    }
  }, [isLoading]);

  return component;


};

export default PrivateRoute;


// const authenticate = async () => {
//   const res = await fetch('http://localhost:3001/users/authenticate', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//       'Content-type': 'application/json',
//     },
//   });

//   if (res.status === 200) {
//     setIsLoggedIn(true);
//   }
// };

// if (isLoggedIn === null) {
//   authenticate();
// } else {