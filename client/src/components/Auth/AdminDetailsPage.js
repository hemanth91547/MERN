import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDetailsPage.css";

const AdminDetailsPage = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5023/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
        navigate("/login");
      }
    };

    fetchAdminDetails();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.delete("http://localhost:5023/api/admin/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error during logout:", err);
      }
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const goToResourceManager = () => {
    navigate("/resources");
  };

  return (
    <div className="admin-details-page">
      <div className="admin-container">
        <h2 className="admin-title">Admin Details</h2>
        {admin ? (
          <div className="admin-details">
            <p className="admin-info">
              <strong>Username:</strong> {admin.username}
            </p>
            <p className="admin-info">
              <strong>Email:</strong> {admin.email}
            </p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            <button
              className="resource-manager-button"
              onClick={goToResourceManager}
            >
              Resource Manager
            </button>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDetailsPage;
