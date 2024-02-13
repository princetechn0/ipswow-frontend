import Placeholder from "react-bootstrap/Placeholder";

function PlaceholderTable() {
  const tableHeaders = ["iOS", "iPadOS", "MacOS/WatchOS"];
  return (
    <div className="row shadow-lg p-3 rounded-lg" id="device_tables">
      {tableHeaders.map((deviceType, index) => {
        return <Table key={index} header={deviceType} />;
      })}
    </div>
  );
}

function Table({ header }) {
  const rowsPerTable = Array.from({ length: 15 }, (_, index) => index);
  return (
    <div className="col-lg-4 my-3 my-lg-2 my-custom-scrollbar">
      <table className="table table-bordered  table-striped">
        <thead className="purple-head text-center">
          <tr>
            <th scope="col" className="col-9">
              {header}
            </th>
            <th scope="col" id="latest">
              Latest
            </th>
          </tr>
        </thead>
        <tbody>
          {rowsPerTable.map((element, index) => (
            <tr key={index}>
              <td className="col-9 text-center">
                <Placeholder.Button
                  animation="glow"
                  xs={8}
                  aria-hidden="true"
                  size="sm"
                />
              </td>
              <td>
                <Placeholder.Button
                  animation="glow"
                  xs={12}
                  aria-hidden="true"
                  size="sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlaceholderTable;
