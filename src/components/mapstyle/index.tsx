import React from "react";
import { Location } from "../layout/svg";
import styles from "./index.module.css";
import clasic from "./assets/classic.png";
import blurprint from "./assets/blueprint.png";
import night from "./assets/night.png";

const mapStyles = {
  classic: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  blueprint: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  night:
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
};

type MapStyleProps = {
  closeMapStyle: () => void;
  setMapStyle: (style: string) => void;
};

export const MapStyle: React.FC<MapStyleProps> = ({
  closeMapStyle,
  setMapStyle,
}) => {
  return (
    <div className={styles.Wrapper}>
      <span onClick={closeMapStyle}></span>
      <div>
        <h2>
          <Location colors="white" /> Map Style
        </h2>
        <div className={styles.sty}>
          <button onClick={() => setMapStyle(mapStyles.classic)}>
            <img src={clasic} alt="Classic" />
            <p>Classic</p>
          </button>
          <button onClick={() => setMapStyle(mapStyles.blueprint)}>
            <img src={blurprint} alt="Blueprint" />
            <p>Blueprint</p>
          </button>
          <button onClick={() => setMapStyle(mapStyles.night)}>
            <img src={night} alt="Night" />
            <p>Night</p>
          </button>
        </div>
        <div className={styles.btnwrap}>
          <button onClick={closeMapStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 60 60"
              fill="none"
            >
              <rect width="60" height="60" rx="30" fill="#2B2C2F" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.5476 35.3633L32.1843 30L37.5476 24.6367C38.1508 24.0335 38.1508 23.0556 37.5476 22.4524C36.9444 21.8492 35.9665 21.8492 35.3633 22.4524L30 27.8157L24.6367 22.4524C24.0335 21.8492 23.0556 21.8492 22.4524 22.4524C21.8492 23.0556 21.8492 24.0335 22.4524 24.6367L27.8157 30L22.4524 35.3633C21.8492 35.9665 21.8492 36.9444 22.4524 37.5476C23.0556 38.1508 24.0335 38.1508 24.6367 37.5476L30 32.1843L35.3633 37.5476C35.9665 38.1508 36.9444 38.1508 37.5476 37.5476C38.1508 36.9444 38.1508 35.9665 37.5476 35.3633Z"
                fill="white"
              />
            </svg>
          </button>
          <button onClick={closeMapStyle}>Apply</button>
        </div>
      </div>
    </div>
  );
};
