import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CloseBtn, ThreeDots } from "../../../assets/svg";
import styles from "./styles.module.css";

interface RouteSettingsProps {
  step: string;
  setStep: (step: string) => void;
  clearData: () => void;
  startAddress: string;
  endAddress: string;
}

export const RouteSettings: React.FC<RouteSettingsProps> = ({
  step,
  setStep,
  clearData,
  startAddress,
  endAddress,
}) => {
  const [routeName, setRouteName] = useState("");
  const [prevStep, setPrevStep] = useState(step);

  useEffect(() => {
    setPrevStep(step);
  }, [step]);

  const handleLoadRoute = (route: string) => {
    console.log(`Loading route: ${route}`);
  };

  const handleSaveRoute = () => {
    console.log(`Saving route: ${routeName}`);
    // Save route logic here
  };

  const formatAddress = (address: string) => {
    return address.split(",")[0];
  };

  return (
    <div className={styles.selectionsWrapper}>
      <div
        className={`${styles.one} ${
          step === "one" ? styles.active : prevStep === "one" ? styles.exit : ""
        }`}
      >
        <div className={styles.top}>
          <button onClick={() => setStep("two")}>
            <ThreeDots />
          </button>
          <div>
            <h2>
              {formatAddress(startAddress)} - {formatAddress(endAddress)}
            </h2>
            <p>2 Points</p>
          </div>
          <button>+</button>
        </div>
        <button onClick={() => console.log("Create video")}>
          Create video <ArrowRight />
        </button>
      </div>

      <div
        className={`${styles.two} ${
          step === "two" ? styles.active : prevStep === "two" ? styles.exit : ""
        }`}
      >
        <div className={styles.top}>
          <button onClick={() => setStep("one")}>
            <CloseBtn />
          </button>
          <h2>Route settings</h2>
        </div>
        <div className={styles.bottom}>
          <button
            onClick={() => setStep("four")}
            style={{ backgroundColor: "#EB4E4E", color: "black" }}
          >
            Delete
          </button>
          <button onClick={() => setStep("three")}>Save</button>
          <button onClick={() => setStep("five")}>Load</button>
        </div>
      </div>

      <div
        className={`${styles.three} ${
          step === "three"
            ? styles.active
            : prevStep === "three"
            ? styles.exit
            : ""
        }`}
      >
        <div className={styles.top}>
          <button onClick={() => setStep("two")}>
            <ArrowLeft />
          </button>
          <h2>Save route</h2>
        </div>
        <div className={styles.bottom}>
          <input
            type="text"
            placeholder="Enter route name"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
          <button onClick={handleSaveRoute}>Save</button>
        </div>
      </div>

      <div
        className={`${styles.four} ${
          step === "four"
            ? styles.active
            : prevStep === "four"
            ? styles.exit
            : ""
        }`}
      >
        <div className={styles.top}>
          <button onClick={() => setStep("two")}>
            <CloseBtn />
          </button>
          <h2>Delete route</h2>
        </div>
        <div className={styles.bottom}>
          <h1>Are you sure?</h1>
          <button
            onClick={clearData}
            style={{ backgroundColor: "#EB4E4E", color: "black" }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        className={`${styles.five} ${
          step === "five"
            ? styles.active
            : prevStep === "five"
            ? styles.exit
            : ""
        }`}
      >
        <div>
          <button onClick={() => setStep("two")}>←</button>
          <h2>Load route</h2>
        </div>
        <div>
          <button onClick={() => handleLoadRoute("Kochi - Los Angeles")}>
            Kochi - Los Angeles
          </button>
          <button onClick={() => handleLoadRoute("Dubai trip")}>
            Dubai trip
          </button>
          <button onClick={() => handleLoadRoute("Some other route")}>
            Some other route
          </button>
          <button onClick={() => console.log("Load the selected route")}>
            Load
          </button>
        </div>
      </div>
    </div>
  );
};
