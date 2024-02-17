import "../styling/Hover.css";

function PresetCard({ data, handlePresetClick }) {
  return (
    <div
      onClick={() => handlePresetClick(data)}
      className="preset-card hvr-grow"
    >
      <h3 className="preset-card-title">{data.name}</h3>
      <DeviceNameList devices={data.value} />
    </div>
  );
}

function DeviceNameList({ devices }) {
  const AMOUNT_TO_COLLAPSE = 4;
  const collapsed = devices.length > AMOUNT_TO_COLLAPSE;
  const trimmedDeviceList = [];
  if (collapsed) {
    for (let i = 0; i < AMOUNT_TO_COLLAPSE; i++) {
      trimmedDeviceList.push(<DeviceNameItem key={i} name={devices[i].name} />);
    }
    trimmedDeviceList.push(`+ ${devices.length - AMOUNT_TO_COLLAPSE} more`);
  } else {
    devices.forEach((device, index) =>
      trimmedDeviceList.push(<DeviceNameItem key={index} name={device.name} />)
    );
  }

  return trimmedDeviceList;
}

function DeviceNameItem({ name }) {
  const cleanedName = name.trim().split("/");
  const collapsed = cleanedName.length > 2;
  const trimmedString = [];
  for (let i = 0; i < 2; i++) {
    trimmedString.push(<h5 key={i}> {cleanedName[i]} </h5>);
  }
  if (collapsed) {
    trimmedString.push(`+ ${cleanedName.length - 3} more`);
  }
  return <div className="device-name">{trimmedString}</div>;
}

export default PresetCard;
