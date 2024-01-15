import { useEffect } from 'react';

const useHandleModalEscape = (closeModal) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);
};

export default useHandleModalEscape;
