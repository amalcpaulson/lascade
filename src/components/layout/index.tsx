import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import { Design, Diamond, Location, Settings } from "./svg";
import { MapStyle } from "../mapstyle";

const mapStyles = {
  classic: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  blueprint: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  night:
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
};

type Props = {};

export const Layout: React.FC<Props> = (_props) => {
  const [isMapStyleVisible, setMapStyleVisible] = useState(false);
  const [selectedMapStyle, setSelectedMapStyle] = useState(mapStyles.classic); // Default map style

  const toggleMapStyle = () => {
    setMapStyleVisible(!isMapStyleVisible);
  };

  const closeMapStyle = () => {
    setMapStyleVisible(false);
  };

  const setMapStyle = (style: string) => {
    setSelectedMapStyle(style);
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.top}>
        <button>
          <Diamond />
          PRO
          <Design />
        </button>
        <div>
          <button onClick={toggleMapStyle}>
            <Location />
          </button>
          <button>
            <Settings />
          </button>
        </div>
      </div>
      <Outlet context={{ mapStyle: selectedMapStyle }} />
      {isMapStyleVisible && (
        <MapStyle closeMapStyle={closeMapStyle} setMapStyle={setMapStyle} />
      )}
    </div>
  );
};
