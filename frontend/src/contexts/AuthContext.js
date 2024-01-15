import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token')) {
           //Verify token (add verification route that returns username.). Use hook?
            //set user using the data returned from the above auth route.
            setIsLoggedIn(true);
        }
    }); //add isLoggedIn dependency.

      //add parameter for formData
    const logIn = () => {
        //login using formdata. it seems loginhook is good to use here.
      //or, put the full login logice here and reuse the authcontext (instead of using authcontext and uselogin as before.)
        setIsLoggedIn(true);
    }

    const logOut = () => {
        localStorage.removeItem('token');
        //setUser to null
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}