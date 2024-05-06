import Button from '../Common/Button';
import SignUpModal from '../SignUpModal/SignUpModal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import LoginModal from '../Modal/LoginModal';
import Logo from './Logo';

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { logOutPrompt } from '../../utils/prompts';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isButtonsLoaded, setIsButtonsLoaded] = useState(false);
  const [isLogOutPromptOpen, setisLogOutPromptOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logOut, user } = useContext(AuthContext);

  useEffect(() => {
    setIsButtonsLoaded(true);
  }, []);

  const buttonComponents = (
    <div>
      {isLoggedIn ? (
        <div className="flex">
          {isLoggedIn && user ? <p>Welcome {user.name}</p> : null}

          {/* <a
            href="/"
            className="btn bg-red-400 mx-2 py-3"
            onClick={() => setisLogOutPromptOpen(true)}
          >
            Log Out
          </a> */}

          <Button
            label={'Log Out'}
            className={'btn bg-red-400 mx-2 py-3'}
            onClick={() => setisLogOutPromptOpen(true)}
          />

          <Button
            label={'To Dashboard'}
            className={'btn bg-blue-400 mx-2'}
            onClick={() => navigate('/user')}
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
            onClick={() => setIsLoginModalOpen(true)}
          />

          <Link to="/">
            <Button
              label={'Sign up'}
              className={'btn bg-blue-500'}
              onClick={() => setIsSignUpModalOpen(true)}
            />
          </Link>
        </>
      )}
    </div>
  );

  return (
    <div className="flex justify-between items-center h-24 px-2 bg-orange-100">
      <Logo />
      {isButtonsLoaded ? buttonComponents : null}
      {isLoginModalOpen ? (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      ) : null}
      {isSignUpModalOpen ? (
        <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />
      ) : null}

      {isLogOutPromptOpen ? (
        <ConfirmationModal
          message={logOutPrompt}
          setIsModalOpen={setisLogOutPromptOpen}
          confirm={() => {
            // localStorage.removeItem('token');
            logOut();
            navigate('/');
          }}
        />
      ) : null}
    </div>
  );
}
