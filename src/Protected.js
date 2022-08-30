import React from 'react'
import { Navigate, Outlet } from "react-router"

const Protected = () => {
    const token = localStorage.getItem("USER_TOKEN")
    return token ? <Outlet /> : <Navigate to="/" />
}

export default Protected