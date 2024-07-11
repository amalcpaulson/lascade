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
  mapStyle: string;
};

// Define custom icons
const customIcon = L.icon({
  iconUrl: "/starting.png", // Replace with the path to your custom icon
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

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
  mapStyle,
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
        url={mapStyle}
      />

      <Marker position={[startLat, startLong]} icon={customIcon}>
        <Popup>Starting Point</Popup>
      </Marker>
      {intermediatePoints.map((point, index) => (
        <Marker
          key={index}
          position={[point.lat, point.long]}
          icon={customIcon}
        >
          <Popup>Intermediate Point {index + 1}</Popup>
        </Marker>
      ))}
      <Marker position={[endLat, endLong]} icon={customIcon}>
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
        mapStyle={""}
      />
    </MapContainer>
  );
};
