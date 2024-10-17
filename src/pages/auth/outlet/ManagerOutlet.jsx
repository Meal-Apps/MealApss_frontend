import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ManagerOutlet() {
    const admin = JSON.parse(localStorage.getItem('manager'));
    const meal_name = admin?.meal_name;

    if (!meal_name) {
        return <Navigate to={'/manager-login'} />;
      }
      return  <Outlet></Outlet> 
}

export default ManagerOutlet