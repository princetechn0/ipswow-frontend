import { useState } from "react";
import "../styling/Table.css";

export default function Table({
  header,
  data,
  onRowClick,
  onHeaderClick,
  listToDownload,
  latestFirmwares,
}) {
  return (
    <div className="col-lg-4 my-3 my-lg-2 my-custom-scrollbar">
      <table className="table table-bordered home-table table-striped table-hover">
        <thead className="purple-head text-center">
          <tr onClick={() => onHeaderClick(data)}>
            <th scope="col" className="col-9">
              {header}
            </th>
            <th scope="col" id="latest">
              Latest
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((device, index) => (
            <TableRow
              key={index}
              data={device}
              onRowClick={onRowClick}
              isHighlighted={
                listToDownload && listToDownload.includes(device)
                  ? "selected"
                  : ""
              }
              latestFirmware={
                Object.values(latestFirmwares).includes(device.firmware)
                  ? "latest-firmware"
                  : ""
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ data, onRowClick, isHighlighted, latestFirmware }) {
  const collapsible = data.name.split("/").length > 2;
  return (
    <tr onClick={() => onRowClick(data)} className={`${isHighlighted}`}>
      <td className="col-9">
        {collapsible ? (
          <CollapsibleRow name={data.name} />
        ) : (
          displayName(data.name)
        )}
      </td>
      <td className={`${latestFirmware}`}>{data.firmware}</td>
    </tr>
  );
}

export function CollapsibleRow({ name }) {
  const [collapsed, setIsCollapsed] = useState(() => true);
  const toggleCollapsed = (event) => {
    event.stopPropagation();
    setIsCollapsed(!collapsed);
  };

  return collapsed ? (
    <div className="table-row-styling">
      <div>{displayName(name, 2)}</div>
      <svg
        onClick={toggleCollapsed}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrows-expand"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10"
        ></path>
      </svg>
    </div>
  ) : (
    <div className="table-row-styling">
      <div> {displayName(name)} </div>
      <svg
        onClick={toggleCollapsed}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrows-collapse"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"
        ></path>
      </svg>
    </div>
  );
}

export function displayName(name, limit) {
  const cleanedName = name.trim().split("/");
  const loopLength = limit ?? cleanedName.length;
  const trimmedString = [];
  for (let i = 0; i < loopLength; i++) {
    trimmedString.push(
      <p key={i} className="m-0">
        {cleanedName[i]}
      </p>
    );
  }
  return trimmedString;
}
