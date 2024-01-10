import { useEffect } from "react";

const useHandleModalEscape = (closeModal) => {
  useEffect(() => {
    const handleEscape = () => {
      closeModal();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);
};

export default useHandleModalEscape;
