import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import { Home } from 'lucide-react'

function App() {
  return (
    <div>
      
      <Navbar/>
      <Home/>
      <AppRoutes/>
      
    </div>
  )
}

export default App
