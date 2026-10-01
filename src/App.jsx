import React from 'react'
import { Toaster } from "react-hot-toast";
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


      {/* TOST/// */}




      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#292524",
            border: "1px solid #e7e5e4",
            padding: "12px 16px",
            fontSize: "14px",
          },

          success: {
            iconTheme: {
              primary: "#17634f",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />

      
    </div>
  )
}

export default App
