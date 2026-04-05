import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const positions = [
  {
    name: "Project Alpha",
    position: [-37.8136, 144.9631], // Melbourne
    status: "In Progress",
  },
  {
    name: "Project Beta",
    position: [-33.8688, 151.2093], // Sydney
    status: "Pending",
  },
];

function App() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        GeoTrack - Infrastructure Map
      </h2>

      <MapContainer
        center={[-37.8136, 144.9631]}
        zoom={5}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.map((item, index) => (
          <Marker key={index} position={item.position}>
            <Popup>
              <b>{item.name}</b>
              <br />
              Status: {item.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;