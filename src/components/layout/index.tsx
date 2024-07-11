import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import { Design, Diamond, Location, Settings } from "./svg";
import { MapStyle } from "../mapstyle";

type Props = {};

export const Layout: React.FC<Props> = (_props) => {
  const [isMapStyleVisible, setMapStyleVisible] = useState(false);

  const toggleMapStyle = () => {
    setMapStyleVisible(!isMapStyleVisible);
  };

  const closeMapStyle = () => {
    setMapStyleVisible(false);
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
      <Outlet />
      {isMapStyleVisible && <MapStyle closeMapStyle={closeMapStyle} />}
    </div>
  );
};
