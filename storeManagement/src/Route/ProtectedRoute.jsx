import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children , allowedRoles}) => {
  const { role, token } = useSelector((state) => state.Authentication);

  if( !token && !role ) {
    return <Navigate to="/" replace />;
  }

  if (!role && allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return (
      children
  )
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}

export default ProtectedRoute
