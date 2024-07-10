import React from "react";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
};


export const Map: React.FC<Props> = ({
  startLat,
  startLong,
  endLat,
  endLong,
}) => {
  const polylinePositions: [number, number][] = [
    [startLat, startLong],
    [endLat, endLong],
  ];
  return (
    <MapContainer
      center={[startLat, startLong]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "100dvh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[startLat, startLong]}>
        <Popup>Starting Point</Popup>
      </Marker>
      <Marker position={[endLat, endLong]}>
        <Popup>Ending Point</Popup>
      </Marker>
      <Polyline
        positions={polylinePositions}
        pathOptions={{ color: "#23396B", dashArray: "10, 10" }}
      />
    </MapContainer>
  );
};
