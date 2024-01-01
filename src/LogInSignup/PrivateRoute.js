import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // You can render a loading indicator or any other content here
    return <p>Loading...</p>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
