import React, { useState } from "react";
import { Map } from "../map";
import styles from "./index.module.css";
import axios from "axios";

import landing from "./assets/landing.png";
import { ArrowRight, SwapSvg } from "../../assets/svg";

import starting from "/starting.png";
import ending from "/ending.png";

type Props = {};

export const Home: React.FC<Props> = (_props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startCoords, setStartCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [endCoords, setEndCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startSuggestions, setStartSuggestions] = useState<string[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<string[]>([]);

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  const handleGeocode = async (
    address: string,
    setCoords: (coords: { lat: number; lng: number } | null) => void
  ) => {
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
        setCoords({ lat, lng });
        setError(null);
      } else {
        setError("Address not found");
        setCoords(null);
      }
    } catch (error) {
      setError("Error fetching coordinates");
      setCoords(null);
    }
  };

  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const input = e.target.value;
    setAddress(input);

    if (input.length > 2) {
      try {
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              q: input,
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

  const handleSuggestionClick = async (
    suggestion: string,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
    setCoords: (coords: { lat: number; lng: number } | null) => void
  ) => {
    setAddress(suggestion);
    setSuggestions([]);
    await handleGeocode(suggestion, setCoords);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSwap = () => {
    setStartAddress(endAddress);
    setEndAddress(startAddress);
    setStartCoords(endCoords);
    setEndCoords(startCoords);
  };

  return (
    <div className={styles.Wrapper}>
      <Map
        startLat={startCoords?.lat ?? 57}
        startLong={startCoords?.lng ?? -5}
        endLat={endCoords?.lat ?? 67}
        endLong={endCoords?.lng ?? -5}
      />

      {!startCoords?.lat && !endCoords?.lat && (
        <div className={styles.landingWrapper}>
          <img src={landing} alt="" />
          <div>
            <h2>Add locations to start</h2>
            <p>Hold on map or click add locations</p>
          </div>
          <button onClick={togglePopup}>
            Add locations <ArrowRight />
          </button>
        </div>
      )}

      {showPopup && (
        <div className={styles.addlocationPopup}>
          <div className={styles.addlocation}>
            <span onClick={togglePopup} className={styles.closeButton}></span>
            <h2>Add locations</h2>
            <div className={styles.inputbox}>
              <img src={starting} alt="" />
              <input
                type="text"
                value={startAddress}
                onChange={(e) =>
                  handleAddressChange(e, setStartAddress, setStartSuggestions)
                }
                placeholder="Starting Point"
              />
            </div>
            <button className={styles.swapper} onClick={handleSwap}>
              <SwapSvg />
            </button>
            <div className={styles.inputbox}>
              <img src={ending} alt="" />
              <input
                type="text"
                value={endAddress}
                onChange={(e) =>
                  handleAddressChange(e, setEndAddress, setEndSuggestions)
                }
                placeholder="Ending Point"
              />
            </div>{" "}
            {startSuggestions.length > 0 && (
              <div className={styles.suggestions}>
                {startSuggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion,
                        setStartAddress,
                        setStartSuggestions,
                        setStartCoords
                      )
                    }
                  >
                    {suggestion}
                  </p>
                ))}
              </div>
            )}
            {endSuggestions.length > 0 && (
              <div className={styles.suggestions}>
                {endSuggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion,
                        setEndAddress,
                        setEndSuggestions,
                        setEndCoords
                      )
                    }
                  >
                    {suggestion}
                  </p>
                ))}
              </div>
            )}
            <div>
              {startCoords && (
                <p>
                  Starting Latitude: {startCoords.lat}, Longitude:{" "}
                  {startCoords.lng}
                </p>
              )}
              {endCoords && (
                <p>
                  Ending Latitude: {endCoords.lat}, Longitude: {endCoords.lng}
                </p>
              )}
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
