import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Protected() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/protected', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const objectData = await response.json();
        setUserData(objectData);
      } catch {
        alert('Session expired.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>User Details</h1>
      {!userData ? null : (
        <>
          <h2>{userData.name}</h2>
          <h2>{userData.email}</h2>
          <Button label={'Log Out'} className={'btn bg-orange-300'}  onClick={logOut}/>
        </>
      )}
    </div>
  );
}
