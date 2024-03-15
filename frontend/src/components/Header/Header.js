import Button from '../shared/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import LoginModal from '../LogIn/LoginModal';
import Logo from './Logo';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isButtonsLoaded, setIsButtonsLoaded] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logOut, user } = useContext(AuthContext);

  useEffect(() => {
    setIsButtonsLoaded(true);
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const buttonComponents = (
    <div>
      {isLoggedIn ? (
        <div className="flex">
          {isLoggedIn && user ? <p>Welcome {user.name}</p> : null}

          <a
            href="/"
            className="btn bg-red-400 mx-2 py-3"
            onClick={() => localStorage.removeItem('token')}
          >
            Log Out
          </a>

          <Button
            label={'To Dashboard'}
            className={'btn bg-blue-400 mx-2'}
            onClick={() => navigate('/users/dashboard')}
          />

          <Button
            label={'To Listings'}
            className={'btn bg-blue-400 mx-2'}
            onClick={() => navigate('/books/listings')}
          />
        </div>
      ) : (
        <>
          <Button
            label={'Log in'}
            className={'btn bg-blue-500 mx-2'}
            onClick={openLoginModal}
          />

          <Link to="/signup">
            <Button label={'Sign up'} className={'btn bg-blue-500'} />
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div className="flex justify-between items-center h-24 px-2">
      <Logo />
      {isButtonsLoaded ? buttonComponents : null}
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        closeLoginModal={closeLoginModal}
      />
    </div>
  );
}
