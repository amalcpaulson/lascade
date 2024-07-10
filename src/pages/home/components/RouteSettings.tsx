import React from "react";
import { ArrowRight } from "../../../assets/svg";

interface RouteSettingsProps {
  step: string;
  setStep: (step: string) => void;
  clearData: () => void;
}

export const RouteSettings: React.FC<RouteSettingsProps> = ({
  step,
  setStep,
  clearData,
}) => {
  const handleLoadRoute = (route: string) => {
    // Implement loading the selected route from local storage
    console.log(`Loading route: ${route}`);
  };

  return (
    <div className="selectionsWrapper">
      {step === "one" && (
        <div className="one">
          <div>
            <button onClick={() => setStep("two")}>...</button>
            <h2>
              {/* starting location name */}-{/* end location name */}
            </h2>
            <button>+</button>
          </div>
          <button onClick={() => console.log("Create video")}>
            Create video <ArrowRight />
          </button>
        </div>
      )}
      {step === "two" && (
        <div className="two">
          <div>
            <button onClick={() => setStep("one")}>✖</button>
            <h2>Route settings</h2>
          </div>
          <div>
            <button onClick={() => setStep("four")}>Delete</button>
            <button onClick={() => setStep("three")}>Save</button>
            <button onClick={() => setStep("five")}>Load</button>
          </div>
        </div>
      )}
      {step === "three" && (
        <div className="three">
          <div>
            <button onClick={() => setStep("two")}>←</button>
            <h2>Save route</h2>
          </div>
          <div>
            <input type="text" placeholder="Enter route name" />
            <button onClick={() => console.log("Save route")}>Save</button>
          </div>
        </div>
      )}
      {step === "four" && (
        <div className="four">
          <div>
            <button onClick={() => setStep("two")}>✖</button>
            <h2>Delete route</h2>
          </div>
          <div>
            <h1>Are you sure?</h1>
            <button onClick={clearData}>Delete</button>
          </div>
        </div>
      )}
      {step === "five" && (
        <div className="five">
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
      )}
    </div>
  );
};
