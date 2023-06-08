import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { getRole } from '../../Tokens/token';
import { isLoggedIn } from '../../Tokens/token';


const AdminPrivateRoutes = () => {
    return getRole() !== 0 && getRole() !== 2 && getRole() === 1 ? <Outlet/> : <Navigate to = {"/"} />    
}

export default AdminPrivateRoutes

