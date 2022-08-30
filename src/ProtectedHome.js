import React from 'react'
import { Navigate, Outlet } from "react-router"

const ProtectedHome = () => {
    const token = localStorage.getItem("USER_TOKEN")
    return token ? <Navigate to="/dashboard" /> : <Outlet />
}

export default ProtectedHome