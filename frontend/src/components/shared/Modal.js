import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logIn, updateForm } from '../../utils/helpers';
import { AuthContext } from '../../contexts/AuthContext';

export default function Modal({ children, isModalOpen, closeModal }) {
  useEffect(() => {
    const handleEscape = () => {};
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  //   const [formData, setFormData] = useState({
  //     username: '',
  //     password: '',
  //   });

  //   const navigate = useNavigate();

  //   const handleChange = (e) => {
  //     updateForm(e, setFormData);
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const isLoginSuccessful = await logIn(
  //       formData,
  //       'http://localhost:3001/login'
  //     );

  //     if (isLoginSuccessful) {
  //       setIsLoggedIn(true);
  //       closeLoginModal();
  //       navigate('/');
  //     }
  //   };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      id="parent-div"
      onClick={(e) => {
        if (e.target.id == 'parent-div') {
          closeModal();
        }
      }}
      className="bg-slate-900 bg-opacity-80 w-dvw h-dvh absolute top-0 left-0 flex items-center justify-center"
    >


      {children}
    </div>
  );
}
