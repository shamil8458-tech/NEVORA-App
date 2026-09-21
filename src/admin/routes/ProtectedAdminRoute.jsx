import { Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



function ProtectedAdminRoute({ children }) {

    const {isAuthenticated } = useSelector(
        (state) => state.adminAuth
    );
    

    if(!isAuthenticated ){
        return <Navigate to="/login" replace />
    }
 
    return <Outlet/>

}

export default ProtectedAdminRoute
