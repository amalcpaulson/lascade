import React, { useEffect } from "react";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
};

const SetViewOnChange: React.FC<Props> = ({
  startLat,
  startLong,
  endLat,
  endLong,
}) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      [startLat, startLong],
      [endLat, endLong],
    ]);
    map.fitBounds(bounds);
  }, [startLat, startLong, endLat, endLong, map]);

  return null;
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
      style={{ height: "100vh", width: "100%" }}
      className="custom-map-container"
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
      <SetViewOnChange
        startLat={startLat}
        startLong={startLong}
        endLat={endLat}
        endLong={endLong}
      />
    </MapContainer>
  );
};
