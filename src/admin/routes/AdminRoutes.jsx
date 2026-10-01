import {Routes , Route} from 'react-router-dom'

import ProtectedAdminRoute from './ProtectedAdminRoute'
import AdminLayout from '../components/AdminLayout'

import Dashboard from "../pages/Dashboard"
import Products from "../pages/Products"
import Users from "../pages/Users"
import Orders from "../pages/Orders"

function AdminRoutes() {
  return ( 
    <Routes>

        <Route element={<ProtectedAdminRoute/>}>

        <Route element={<AdminLayout/>}>

       

        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/admin/products' element={<Products/>}/> 
         <Route path='/admin/users' element={<Users/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>

            </Route>
        </Route>


    </Routes>
  )
}

export default AdminRoutes





        // <Route path='/admin' element={<Dashboard/>}/>