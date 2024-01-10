import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
    const {isLoggedIn, logIn, logOut} = useContext(AuthContext);
    
    return  [isLoggedIn, logIn, logOut];
}