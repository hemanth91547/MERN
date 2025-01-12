// src/components/ResourceManagementPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ResourceManagementPage = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: "", content: "" });

  const fetchResources = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(response.data);
    } catch (err) {
      console.log("Error fetching resources:", err);
    }
  };

  const handleAddResource = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/resources",
        newResource,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchResources();
      setNewResource({ title: "", content: "" });
    } catch (err) {
      console.log("Error adding resource:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h2>Manage Resources</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newResource.content}
          onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
        />
        <button onClick={handleAddResource}>Add Resource</button>
      </div>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <h3>{resource.title}</h3>
            <p>{resource.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagementPage;
