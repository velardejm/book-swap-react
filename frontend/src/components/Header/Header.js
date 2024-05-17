import HeaderLinks from './HeaderLinks';
import HeaderDropdown from './HeaderDropdown';
import SignUpModal from '../Modal/SignUpModal/SignUpModal';
import ConfirmationModal from '../Modal/ConfirmationModal';
import LoginModal from '../Modal/LoginModal';
import Logo from './Logo';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { logOutPrompt } from '../../utils/prompts';
import useHandleModalEscape from '../../hooks/useHandleModalEscape';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogOutPromptOpen, setisLogOutPromptOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setisLogOutPromptOpen(false);
    setIsDropdownOpen(false);
  };
  
  useHandleModalEscape(closeAllModals);
  
  return (
    <div className="flex justify-between items-center h-14 px-2 py-10 bg-sky-800">
      <Logo />

      <HeaderLinks
        isLoggedIn={isLoggedIn}
        setisLogOutPromptOpen={setisLogOutPromptOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />

      {isLoginModalOpen && (
        <LoginModal setIsLoginModalOpen={setIsLoginModalOpen} />
      )}

      {isSignUpModalOpen && (
        <SignUpModal setIsSignUpModalOpen={setIsSignUpModalOpen} />
      )}

      {isLogOutPromptOpen && (
        <ConfirmationModal
          message={logOutPrompt}
          setIsModalOpen={setisLogOutPromptOpen}
          confirm={() => {
            logOut();
            setisLogOutPromptOpen(false);
            navigate('/');
          }}
        />
      )}

      <HeaderDropdown
        setisLogOutPromptOpen={setisLogOutPromptOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        isDropdownOpen={isDropdownOpen}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
