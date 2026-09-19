import { Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



function ProtectedAdminRoute() {

    const {isAuthenticated , admin} = useSelector(
        (state) => state.adminAuth
    );
    

    if(!isAuthenticated || admin?.role !== "admin"){
        return <Navigate to="/login" replace />
    }
 
    return <Outlet/>

}

export default ProtectedAdminRoute
