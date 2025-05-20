// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";

import ProfilePage from "./components/Auth/ProfilePage";
import AdminDetailsPage from "./components/Auth/AdminDetailsPage";
import ResourceManagementPage from "./components/ResourceManagementPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
      
        <Routes>

        <Route path="/" element={<LoginPage />} />
        
          <Route path="/login" element={<LoginPage />} />
          
         
          <Route path="/register" element={<RegisterPage />} />
          
         
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="/admin-details" element={<AdminDetailsPage />} />
          <Route path="/resources" element={<ResourceManagementPage />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
