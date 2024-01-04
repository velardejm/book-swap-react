import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    console.log(children);

    return (
        !!localStorage.getItem('token') ? <>{children}</> : <Navigate to='/login' />
    );
};

export default PrivateRoute;