import React from "react";
import Table from "./Table";

function TableList({ tableData, onRowClick, onHeaderClick, listToDownload }) {
  return (
    <div className="row shadow-lg p-3 rounded-lg" id="device_tables">
      {tableData?.devices?.map((deviceType, index) => {
        return (
          <Table
            key={index}
            onRowClick={onRowClick}
            onHeaderClick={onHeaderClick}
            header={deviceType.name}
            data={deviceType.data}
            listToDownload={listToDownload}
            latestFirmwares={tableData?.firmwares}
          />
        );
      })}
    </div>
  );
}

export default TableList;
