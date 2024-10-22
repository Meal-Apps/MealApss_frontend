import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function UserOutlet() {
    const user = JSON.parse(localStorage.getItem('manager'));
    const role = user?.role;
    if (role == 'user' ) {
        return  <Outlet></Outlet> 
      }
      
      return <Navigate to={'/manager-login'} />;
}

export default UserOutlet