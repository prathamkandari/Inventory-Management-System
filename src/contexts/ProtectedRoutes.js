// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";


// export const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     // user is not authenticated
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();

//   // If the user is authenticated, render the children
//   if (user) {
//     return children;
//   }

//   // If the user is not authenticated, redirect to the login page
//   return <Navigate to="/login" replace />;
// };

// ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ element }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected component
  return element;
}
