// src/components/AdminDetailsPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDetailsPage = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case where token is not found (optional)
        return;
      }

      try {
        const response = await axios.get("http://localhost:5023/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdmin(response.data);
        console.log("response===",response) // Update state with admin details
      } catch (error) {
        console.error("Error fetching admin details:", error);
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchAdminDetails();
  }, []);

  return (
    <div>
      <h2>Admin Details</h2>
      {admin ? (
        <div>
          <p>Username: {admin.username}</p>
          <p>Email: {admin.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDetailsPage;
