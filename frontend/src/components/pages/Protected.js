import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import useAuthContext from '../../hooks/useAuthContext';


export default function Protected() {
  const navigate = useNavigate();

  const [isLoggedIn, logIn, logOut] = useAuthContext()

  const [data] = useFetchData(
    'http://localhost:3001/protected'
  );


  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div>
      <h1>User Details</h1>
      {!data ? null : (
        <>
          <h2>{data.name}</h2>
          <h2>{data.email}</h2>
          <Button
            label={'Log Out'}
            className={'btn bg-orange-300'}
            onClick={handleLogOut}
          />
        </>
      )}
    </div>
  );
}
