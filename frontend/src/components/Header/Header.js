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
  const [open, setOpen] = useState(false);
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

      <div className="flex">
        {isLoggedIn && <Button
          label={'Log Out'}
          className={'btn bg-red-400 mx-2 py-3'}
          onClick={() => setisLogOutPromptOpen(true)}
        />}

        {isLoggedIn && <Button
          label={'To Dashboard'}
          className={'btn bg-blue-400 mx-2'}
          onClick={() => navigate('/user')}
        />}

        {isLoggedIn && <Button
          label={'To Listings'}
          className={'btn bg-blue-400 mx-2'}
          onClick={() => navigate('/books/listings')}
        />}

        {!isLoggedIn && <Button
          label={'Log in'}
          className={'btn bg-blue-500 mx-2'}
          onClick={() => setIsLoginModalOpen(true)}
        />}

        {!isLoggedIn && <Button
          label={'Sign up'}
          className={'btn bg-blue-500'}
          onClick={() => setIsSignUpModalOpen(true)}
        />}

      </div>

    </div>
  );

  return (
    <div className="flex justify-between items-center h-24 px-2 bg-orange-100">
      <Logo />

      {/* {isButtonsLoaded ? buttonComponents : null} */}
      {buttonComponents}

      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}

      {isSignUpModalOpen && <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />}

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

      <div className="relative">
        {/* Hamburger Button */}
        <button onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10" onClick={() => setOpen(false)}>
            {/* <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Services</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</a> */}
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setisLogOutPromptOpen(true)} > Log Out</a>



          </div>
        )}
      </div>

    </div >
  );
}
