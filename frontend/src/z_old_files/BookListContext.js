import { createContext, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const BookListContext = createContext();

export const BookListContextProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      setBookList(['Books']);
    } else {
      setBookList(null);
    }
  }, []);

  return (
    <BookListContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BookListContext.Provider>
  );
};
