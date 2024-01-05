import { Navigate } from "react-router-dom";

import useAuth from '../hooks/useAuth'

function RequireAuth({children}) {
    const {user, loading} = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to='/' />
    }

    return children;
}

export default RequireAuth