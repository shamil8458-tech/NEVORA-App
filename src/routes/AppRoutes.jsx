import { Route , Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import ProductDetails from "../Pages/ProductDetails"
import Products from "../Pages/Products"

function AppRoutes() {
  return (
    <div>

        <Routes>
     
             <Route path="/" element={<h1>Home Page</h1>}/>
              <Route path="/login" element={<Login/>}/>
             <Route path="/register" element={<Register/>}/>
             <Route path="/products" element={<Products/>}/>
             <Route path="/products/:id" element={<ProductDetails/>}/>

             
        </Routes>
      
    </div>
  )
}

export default AppRoutes
