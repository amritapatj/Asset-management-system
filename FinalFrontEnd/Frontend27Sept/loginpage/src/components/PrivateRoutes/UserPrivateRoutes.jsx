import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { getRole } from '../../Tokens/token';
import { isLoggedIn } from '../../Tokens/token';

const UserPrivateRoutes = () => {
  return getRole() !== 0 && getRole() !== 1 && getRole() === 2 ? <Outlet /> : <Navigate to = {"/"} />
}

export default UserPrivateRoutes
