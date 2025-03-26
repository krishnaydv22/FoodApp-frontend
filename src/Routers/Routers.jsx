import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoutes from './AdminRoutes'
import CustomerRouter from './CustomerRouter'

const Routers = () => {
  return (
    <Routes>
        <Route path = "/admin/restaurants/*" element={<AdminRoutes />}/>
        <Route path = "/*" element={<CustomerRouter />}/>

      
    </Routes>
  )
}

export default Routers
