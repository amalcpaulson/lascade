import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

export const Map = () => {
  const position = [57.505, -5.09];

  return (
    <MapContainer
      center={[position[0], position[1]]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "300px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position[0], position[1]]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
