import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./LogInSignup/PrivateRoute";

import Inventory from "./Inventory Page/inventory";
import Navbar from "./Navbar_Top/Navbar";
import StockLevels from "./Stock Levels/StockLevels";
import Client from "./Client Page/client";
import LogIn from "./LogInSignup/LogIn";
import SignUp from "./LogInSignup/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import Dashboard_Visualise from "./Dashboard/Dashboard_Visualise";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/stocklevels" element={<StockLevels />} />
          <Route path="/client" element={<Client />} />
          <Route path="/dashboard" element={<Dashboard_Visualise />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
