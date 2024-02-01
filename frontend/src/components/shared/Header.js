import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import LoginModal from '../pages/LoginModal';
import Logo from './Logo';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isButtonsLoaded, setIsButtonsLoaded] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useContext(AuthContext);

  useEffect(() => {
    setIsButtonsLoaded(true);
  }, []);

  const handleLogOut = () => {
    logOut();
    navigate('/');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const buttonComponents = (
    <div>
      {isLoggedIn ? (
        <div>
          <Button
            label={'Log out'}
            className={'btn bg-orange-400 mx-2'}
            onClick={handleLogOut}
          />

          <Button
            label={'To Dashboard'}
            className={'btn bg-orange-400 mx-2'}
            onClick={() => navigate('/users/dashboard')}
          />
        </div>
      ) : (
        <>
          {/* <Link to="/login"> */}
          <Button
            label={'Log in'}
            className={'btn bg-blue-500 mx-2'}
            onClick={openLoginModal}
          />
          {/* </Link> */}

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
