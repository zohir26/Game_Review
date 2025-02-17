import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
if(loading){
  return <Loading></Loading>
}
  // Check if the user is logged in
  if (user && user.email) {
    return children; // Allow access to the child component
  }

  // Redirect to login page if not logged in
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
