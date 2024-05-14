import HeaderLinks from './HeaderLinks';
import HeaderDropdown from './HeaderDropdown';
import SignUpModal from '../SignUpModal/SignUpModal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import LoginModal from '../Modal/LoginModal';
import Logo from './Logo';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { logOutPrompt } from '../../utils/prompts';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogOutPromptOpen, setisLogOutPromptOpen] = useState(false);
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();



  return (
    <div className="flex justify-between items-center h-24 px-2 bg-orange-100">
      <Logo />

      <HeaderLinks
        isLoggedIn={isLoggedIn}
        setisLogOutPromptOpen={setisLogOutPromptOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsLoginModalOpen}
      />

      {isLoginModalOpen && <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />}

      {isSignUpModalOpen && <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />}

      {isLogOutPromptOpen &&
        <ConfirmationModal
          message={logOutPrompt}
          setIsModalOpen={setisLogOutPromptOpen}
          confirm={() => {
            // localStorage.removeItem('token');
            logOut();
            navigate('/');
          }}
        />}

      <HeaderDropdown setisLogOutPromptOpen={setisLogOutPromptOpen} />

    </div >
  );
}
