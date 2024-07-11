import React, { useState } from "react";
import axios from "axios";
import { ArrowRight, Dragger, ThreeDots } from "../../../assets/svg";
import styles from "./styles.module.css";
import starting from "/starting.png";
import ending from "/ending.png";

interface IntermediatePoint {
  lat: number;
  long: number;
  address: string;
}

interface RouteupdateProps {
  closeRouteUpdate: () => void;
  startAddress: string;
  endAddress: string;
  intermediatePoints: IntermediatePoint[];
  addIntermediatePoint: (point: IntermediatePoint) => void;
}

export const Routeupdate: React.FC<RouteupdateProps> = ({
  closeRouteUpdate,
  startAddress,
  endAddress,
  intermediatePoints,
  addIntermediatePoint,
}) => {
  const [intermediateAddress, setIntermediateAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY; // Your geocoding API key

  const formatAddress = (address: string) => {
    return address.split(",")[0];
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              q: query,
              key: apiKey,
            },
          }
        );
        if (response.data.results.length > 0) {
          setSuggestions(
            response.data.results.map((result: any) => result.formatted)
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleAddIntermediatePoint = async (address: string) => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: address,
            key: apiKey,
          },
        }
      );
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        const point = { lat, long: lng, address };
        addIntermediatePoint(point);
        setIntermediateAddress("");
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching coordinates");
    }
  };

  return (
    <div className={styles.WrapperRoute}>
      <span onClick={closeRouteUpdate}>Close</span>
      <div className={styles.one}>
        <div className={styles.top}>
          <button onClick={() => console.log("Step two")}>
            <ThreeDots />
          </button>
          <div>
            <h2>
              {formatAddress(startAddress)} - {formatAddress(endAddress)}
            </h2>
            <p>{2 + intermediatePoints.length} Points</p>
          </div>
          <button
            onClick={() => handleAddIntermediatePoint(intermediateAddress)}
          >
            +
          </button>
        </div>
        <div className={styles.Container}>
          <div>
            <div>
              <img src={starting} alt="" />
              <input
                type="text"
                placeholder="Starting address"
                defaultValue={startAddress}
              />
            </div>
            <button>
              <Dragger />
            </button>
          </div>{" "}
          {intermediatePoints.map((point, index) => (
            <div key={index}>
              <div>
                <img src={ending} alt="" />
                <input
                  type="text"
                  placeholder="Intermediate address"
                  defaultValue={point.address}
                />
              </div>
              <button>
                <Dragger />
              </button>
            </div>
          ))}
          <div>
            <div>
              <img src={ending} alt="" />
              <input
                type="text"
                placeholder="Intermediate address"
                value={intermediateAddress}
                onChange={(e) => {
                  setIntermediateAddress(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
              />
            </div>
            <button>
              <Dragger />
            </button>
          </div>
          <div>
            <div>
              <img src={ending} alt="" />
              <input
                type="text"
                placeholder="Ending address"
                defaultValue={endAddress}
              />
            </div>
            <button>
              <Dragger />
            </button>
          </div>
        </div>
        {suggestions.length > 0 && (
          <div className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <p
                key={index}
                onClick={() => handleAddIntermediatePoint(suggestion)}
              >
                {suggestion}
              </p>
            ))}
          </div>
        )}
        <button onClick={() => console.log("Create video")}>
          Create video <ArrowRight />
        </button>
      </div>
    </div>
  );
};
