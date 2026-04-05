import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { API_BASE_URL } from "./config/apiConfig";
// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function App() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState([]);

  // Fetch backend data
useEffect(() => {
  fetch(`${API_BASE_URL}/projects`)
    .then((res) => res.json())
    .then((data) => setProjects(data))
    .catch((err) => console.error("API Error:", err));
}, []);

  // Filter logic
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.status === filter);

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "300px",
          padding: "15px",
          background: "#f5f7fa",
          overflowY: "auto",
        }}
      >
        <h2>Geo Dashboard</h2>

        {/* FILTER */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="All">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        {/* PROJECT LIST */}
        <div style={{ marginTop: "15px" }}>
          {filtered.map((p) => (
            <div
              key={p.id}
              style={{
                padding: "10px",
                marginBottom: "10px",
                background: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <b>{p.name}</b>
              <br />
              <small>{p.status}</small>
            </div>
          ))}
        </div>
      </div>

      {/* MAP SECTION */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[-37.8136, 144.9631]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* FIXED MARKERS */}
          {filtered.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
            >
              <Popup>
                <b>{item.name}</b>
                <br />
                Status: {item.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;