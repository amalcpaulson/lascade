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

interface IntermediatePoint {
  lat: number;
  long: number;
}

type Props = {
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
  intermediatePoints?: IntermediatePoint[];
};

const SetViewOnChange: React.FC<Props> = ({
  startLat,
  startLong,
  endLat,
  endLong,
  intermediatePoints = [],
}) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([
      [startLat, startLong],
      ...intermediatePoints.map(
        (point) => [point.lat, point.long] as [number, number]
      ),
      [endLat, endLong],
    ]);
    map.fitBounds(bounds);
  }, [startLat, startLong, endLat, endLong, intermediatePoints, map]);

  return null;
};

export const Map: React.FC<Props> = ({
  startLat,
  startLong,
  endLat,
  endLong,
  intermediatePoints = [],
}) => {
  const polylinePositions: [number, number][] = [
    [startLat, startLong],
    ...intermediatePoints.map(
      (point) => [point.lat, point.long] as [number, number]
    ),
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
      {intermediatePoints.map((point, index) => (
        <Marker key={index} position={[point.lat, point.long]}>
          <Popup>Intermediate Point {index + 1}</Popup>
        </Marker>
      ))}
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
        intermediatePoints={intermediatePoints}
      />
    </MapContainer>
  );
};
