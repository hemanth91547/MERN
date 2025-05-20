import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ResourceManagementPage.css";

const ResourceManagementPage = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: "", content: "" });

  // Fetch resources when the page loads
  const fetchResources = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5023/api/resource/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched resources:", response.data); // Log the fetched resources
      setResources(response.data);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  // Handle adding a new resource
  const handleAddResource = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5023/api/resource/",
        newResource,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Resource added:", response.data); // Log the added resource
      fetchResources(); // Fetch updated list of resources
      setNewResource({ title: "", content: "" }); // Reset the input fields
    } catch (err) {
      console.error("Error adding resource:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="resource-page">
      <h2 className="resource-title">Manage Resources</h2>

      <div className="resource-input-container">
        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
          className="resource-input"
        />
        <textarea
          placeholder="Content"
          value={newResource.content}
          onChange={(e) => setNewResource({ ...newResource, content: e.target.value })}
          className="resource-textarea"
        ></textarea>
        <button onClick={handleAddResource} className="add-resource-button">
          Add Resource
        </button>
      </div>

      <ul className="resource-list">
        {resources.map((resource) => (
          <li key={resource._id} className="resource-item">
            <h3 className="resource-item-title">{resource.title}</h3>
            <p className="resource-item-content">{resource.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagementPage;
