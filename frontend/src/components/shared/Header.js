import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
// import LoginModal from '../pages/LoginModal';
import Logo from './Logo';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="flex justify-between items-center h-24 px-2">
      <Logo />
      <div>
        {isLoggedIn ? (
          <Button
            label={'Log out'}
            className={'btn bg-orange-400 mx-2'}
            onClick={logOut}
          />
        ) : (
          <>
            <Link to="/login">
              <Button
                label={'Log in'}
                className={'btn bg-blue-500 mx-2'}
                onClick={openLoginModal}
              />
            </Link>

            <Link to="/signup">
              <Button label={'Sign up'} className={'btn bg-blue-500'} />
            </Link>
          </>
        )}
      </div>

      {/* <LoginModal isLoginOpen={isLoginOpen} closeLoginModal={closeLoginModal}/> */}
    </div>
  );
}
