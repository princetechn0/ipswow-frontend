import { useEffect, useState } from "react";
import TableList from "../components/TableList";
import DownloadModal from "../components/DownloadModal";
import PlaceholderTable from "../components/PlaceholderTable";

function Home() {
  const BASEURL = "https://ipswow-backend-c492670a5754.herokuapp.com/";
  const [listOfDevices, setListOfDevices] = useState({});
  const [listToDownload, setListToDownload] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handlePresetUpdates();
  }, [listOfDevices]);

  // Modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function handleRowClick(deviceData) {
    if (listToDownload.includes(deviceData)) {
      setListToDownload(
        listToDownload.filter((element) => element !== deviceData)
      );
    } else {
      setListToDownload([...listToDownload, deviceData]);
    }
  }

  function handleHeaderClick(tableData) {
    if (listToDownload.length === 0) {
      setListToDownload([...tableData]);
    } else if (tableData.every((element) => listToDownload.includes(element))) {
      setListToDownload([
        ...listToDownload.filter((e) => !tableData.includes(e)),
      ]);
    } else {
      setListToDownload([...new Set([...listToDownload, ...tableData])]);
    }
  }

  const isButtonDisabled = () =>
    listToDownload.length === 0 ? "disabled btn-outline-danger" : "btn-danger";

  return (
    <>
      <main role="main" className="container">
        <div className="mt-3">
          <div className="jumbotron home-jumbo">
            {error ? (
              <h2 className="text-center">
                Hey! The app is down right now. Please try again later!
              </h2>
            ) : (
              <div className="d-flex flex-column align-items-center">
                <h2>Select some devices, then click</h2>
                <button
                  className={`download-button btn ml-2 mt-2 ${isButtonDisabled()}`}
                  aria-disabled="true"
                  onClick={() => {
                    if (listToDownload.length !== 0) {
                      handleShow();
                    }
                  }}
                >
                  Download
                </button>
              </div>
            )}
          </div>
          {isLoading && <PlaceholderTable />}
          {!error && !isLoading && (
            <TableList
              tableData={listOfDevices}
              onRowClick={handleRowClick}
              onHeaderClick={handleHeaderClick}
              listToDownload={listToDownload}
            />
          )}
          {listToDownload.length !== 0 && (
            <div className="d-flex justify-content-center my-3">
              <button
                className={`btn btn-dark btn-md rounded-pill border border-light`}
                aria-disabled="true"
                onClick={() => setListToDownload([])}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </main>
      <DownloadModal
        listToDownload={listToDownload}
        showModal={showModal}
        handleClose={handleClose}
      />
    </>
  );

  // Local Storage

  //Local Storage Updates
  // check for preset update by comparing iOS firmware version in localStorage
  function handlePresetUpdates() {
    const updateNeeded = checkUpdateNeeded();
    if (updateNeeded) {
      updatePresets();
    }
  }

  function checkUpdateNeeded() {
    try {
      const toUpdate = window.localStorage.getItem("updateFlag");
      const { firmwares } = listOfDevices;
      if (!toUpdate) {
        window.localStorage.setItem("updateFlag", firmwares["iOS"]);
      } else {
        if (toUpdate !== firmwares["iOS"]) {
          window.localStorage.setItem("updateFlag", firmwares.iOS);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function updatePresets() {
    // console.log("RUNNING UPDATE SCRIPT");
    const localStorageKeys = { ...localStorage };
    for (const [key, value] of Object.entries(localStorageKeys)) {
      let parsedJSON;
      try {
        parsedJSON = JSON.parse(value);
      } catch (error) {
        parsedJSON = "";
      }

      if (parsedJSON.length !== 0 && key !== "updateFlag") {
        try {
          const data = await Promise.all(
            parsedJSON.map((device) => getSpecificDevice(device))
          );
          window.localStorage.setItem(
            key,
            JSON.stringify(data.filter(Boolean)) ?? value
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  }

  async function getData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASEURL}/getdevices/`);
      if (response.ok) {
        const data = await response.json();
        setListOfDevices(data);
      } else {
        throw new Error("Data not Retrieved");
      }
    } catch (error) {
      setError(
        "Hey! Looks like the app is in maintenance. Please try again later."
      );
      console.error(error);
    }
    setIsLoading(false);
  }

  async function getSpecificDevice(device) {
    try {
      const response = await fetch(`${BASEURL}/getDeviceByName/${device.name}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return "";
      }
    } catch (error) {
      console.error(" we hit an error boys", error);
      return device;
    }
  }
}

export default Home;
