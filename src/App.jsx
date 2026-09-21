import React from 'react'
import AppRoutes from './routes/AppRoutes'
import AdminRoutes from './admin/routes/AdminRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLocation } from "react-router-dom"

function App() {


  const location = useLocation()

   const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
      location.pathname.startsWith("/admin")


  return (
    <div>
      
      {/* <Navbar/> */}
       {!hideLayout && <Navbar />}
  
      <AppRoutes/>
      <AdminRoutes/>

      {/* <Footer/> */}
      {!hideLayout && <Footer />}
      
    </div>
  )
}

export default App
