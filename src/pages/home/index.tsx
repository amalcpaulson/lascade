import React, { useState, useEffect } from "react";
import { Map } from "../map";
import styles from "./index.module.css";
import axios from "axios";

import landing from "./assets/landing.png";
import { ArrowRight } from "../../assets/svg";
import { Popup } from "./components/Popup";
import { RouteSettings } from "./components/RouteSettings";

type Props = {};

interface LocationData {
  startAddress: string;
  endAddress: string;
  startCoords: { lat: number; lng: number } | null;
  endCoords: { lat: number; lng: number } | null;
}

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
  const [startSuggestions, setStartSuggestions] = useState<string[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<string[]>([]);
  const [step, setStep] = useState("one");

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    saveDataToLocalStorage();
  }, [startCoords, endCoords]);

  const saveDataToLocalStorage = () => {
    const data: LocationData = {
      startAddress,
      endAddress,
      startCoords,
      endCoords,
    };

    const savedData = JSON.parse(localStorage.getItem("locationData") || "[]");
    savedData.push(data);
    localStorage.setItem("locationData", JSON.stringify(savedData));
  };

  const clearData = () => {
    localStorage.removeItem("locationData");
    setStartAddress("");
    setEndAddress("");
    setStartCoords(null);
    setEndCoords(null);
    setStep("one");
  };

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
      } else {
        setCoords(null);
      }
    } catch (error) {
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
      {startCoords?.lat && endCoords?.lat && (
        <RouteSettings step={step} setStep={setStep} clearData={clearData} />
      )}
      <Popup
        showPopup={showPopup}
        togglePopup={togglePopup}
        startAddress={startAddress}
        setStartAddress={setStartAddress}
        endAddress={endAddress}
        setEndAddress={setEndAddress}
        setStartCoords={setStartCoords}
        setEndCoords={setEndCoords}
        handleSwap={handleSwap}
        handleAddressChange={handleAddressChange}
        handleSuggestionClick={handleSuggestionClick}
        startSuggestions={startSuggestions}
        endSuggestions={endSuggestions}
        setStartSuggestions={setStartSuggestions}
        setEndSuggestions={setEndSuggestions}
      />
    </div>
  );
};
