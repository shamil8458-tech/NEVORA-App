import ProtectedRoute from "./ProtectedRoute"

import { Route , Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import ProductDetails from "../Pages/ProductDetails"
import Products from "../Pages/Products"
import Home from "../Pages/Home"
import Cart from "../Pages/Cart"
import Wishlist from "../Pages/Wishlist"
import Checkout from "../Pages/Checkout"
import Orders from "../Pages/Orders"



function AppRoutes() {
  return (
    <div>

        <Routes>
     
             <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
             <Route path="/register" element={<Register/>}/>
             <Route path="/products" element={<Products/>}/>
             <Route path="/products/:id" element={<ProductDetails/>}/>


             <Route path="/cart" element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
             } />
             <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
             } />
             <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
             } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />


        </Routes>
      
    </div>
  )
}

export default AppRoutes
