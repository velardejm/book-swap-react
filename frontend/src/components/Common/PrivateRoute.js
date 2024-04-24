import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);

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
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
  // }
};

export default PrivateRoute;
