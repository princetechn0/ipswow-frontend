import React from "react";
import "../styling/Hover.css";

function PresetCard({ data, handlePresetClick }) {
  return (
    <div
      onClick={() => handlePresetClick(data)}
      className="preset-card hvr-grow"
    >
      <h3 className="preset-card-title">{data.name}</h3>
      {data.value.map((element, index) => (
        <DeviceNameItem key={index} name={element.name} />
      ))}
    </div>
  );
}

function DeviceNameItem({ name }) {
  const cleanedName = name.trim().split("/");
  const collapsed = cleanedName.length > 2;
  const trimmedString = [];
  for (let i = 0; i < 3; i++) {
    trimmedString.push(<h5 key={i}> {cleanedName[i]} </h5>);
  }
  if (collapsed) {
    trimmedString.push(`+ ${cleanedName.length - 3} more`);
  }
  return <div className="device-name">{trimmedString}</div>;
}

export default PresetCard;
