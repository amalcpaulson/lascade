import React from "react";
import styles from "../index.module.css";
import starting from "/starting.png";
import ending from "/ending.png";
import { SwapSvg } from "../../../assets/svg";

interface PopupProps {
  showPopup: boolean;
  togglePopup: () => void;
  startAddress: string;
  setStartAddress: React.Dispatch<React.SetStateAction<string>>;
  endAddress: string;
  setEndAddress: React.Dispatch<React.SetStateAction<string>>;
  setStartCoords: (coords: { lat: number; lng: number } | null) => void;
  setEndCoords: (coords: { lat: number; lng: number } | null) => void;
  handleSwap: () => void;
  handleAddressChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  handleSuggestionClick: (
    suggestion: string,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
    setCoords: (coords: { lat: number; lng: number } | null) => void
  ) => void;
  startSuggestions: string[];
  endSuggestions: string[];
  setStartSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
  setEndSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Popup: React.FC<PopupProps> = ({
  showPopup,
  togglePopup,
  startAddress,
  setStartAddress,
  endAddress,
  setEndAddress,
  setStartCoords,
  setEndCoords,
  handleSwap,
  handleAddressChange,
  handleSuggestionClick,
  startSuggestions,
  endSuggestions,
  setStartSuggestions,
  setEndSuggestions,
}) => {
  if (!showPopup) return null;

  return (
    <div className={styles.addlocationPopup}>
      <span onClick={togglePopup} className={styles.closeButton}></span>
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
        {startAddress && endAddress && (
          <button onClick={togglePopup} className={styles.done}>
            Done
          </button>
        )}
      </div>
    </div>
  );
};
