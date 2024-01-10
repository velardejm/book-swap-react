import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModal from '../pages/LoginModal';
import Logo from './Logo';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isButtonsLoaded, setIsButtonsLoaded] = useState(false);
  const { isLoggedIn, contextLogOut } = useContext(AuthContext);

  useEffect(() => {
    setIsButtonsLoaded(true);
  }, []);

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    contextLogOut()
    navigate('/login');
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
        <Button
          label={'Log out'}
          className={'btn bg-orange-400 mx-2'}
          onClick={logOut}
        />
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
      <LoginModal isLoginModalOpen={isLoginModalOpen} closeLoginModal={closeLoginModal} />
    </div>
  );
}
