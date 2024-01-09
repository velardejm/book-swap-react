import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    });

    const contextLogIn = () => {
        alert('test');
        setIsLoggedIn(true);
    }

    const contextLogOut = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, contextLogIn, contextLogOut}}>
            {children}
        </AuthContext.Provider>
    )
}