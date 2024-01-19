import { useNavigate, useLocation } from "react-router-dom";

const useGetPreviousRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    let { from } = state || { from: '/users/dashboard' };

    return [from, navigate];
}

export default useGetPreviousRoute;