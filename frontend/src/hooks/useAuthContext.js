import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
    const {isLoggedIn, contextLogIn, contextLogOut} = useContext(AuthContext);
    
    return  [isLoggedIn, contextLogIn, contextLogOut];
}