import { Route , Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Register from "../Pages/Register"

function AppRoutes() {
  return (
    <div>

        <Routes>
     
             <Route path="/" element={<h1>Home Page</h1>}/>
              <Route path="/login" element={<Login/>}/>
             <Route path="/register" element={<Register/>}/>

             
        </Routes>
      
    </div>
  )
}

export default AppRoutes
