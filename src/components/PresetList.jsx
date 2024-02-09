import React from "react";
import PresetCard from "./PresetCard";
import "../styling/Preset.css";

function PresetList({ listOfPresets, handlePresetClick }) {
  return (
    <div className="preset-list-grid">
      {listOfPresets.map((element, index) => (
        <PresetCard
          handlePresetClick={handlePresetClick}
          key={index}
          data={element}
        />
      ))}
    </div>
  );
}

export default PresetList;
