import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';
import useAuthorizedFetch from '../../hooks/useAuthorizedFetch';

export default function Protected() {
  const navigate = useNavigate();
  
  const [userData] = useAuthorizedFetch('http://localhost:3001/protected');

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>User Details</h1>
      {!userData ? null : (
        <>
          <h2>{userData.name}</h2>
          <h2>{userData.email}</h2>
          <Button
            label={'Log Out'}
            className={'btn bg-orange-300'}
            onClick={logOut}
          />
        </>
      )}
    </div>
  );
}
