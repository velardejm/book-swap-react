import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    });

    const logIn = () => {
        setIsLoggedIn(true);
    }

    const logOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}