import { useEffect, useState } from "react";
import PresetList from "../components/PresetList";
import DownloadModal from "../components/DownloadModal";

function Presets() {
  const [listToDownload, setListToDownload] = useState([]);
  const [presets, setPresets] = useState([]);
  const [activePreset, setActivePreset] = useState("");
  const [refreshPresetList, setRefreshPresetList] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // get presets
  useEffect(() => {
    const localStorageKeys = { ...localStorage };
    const pairs = [];
    for (const [key, value] of Object.entries(localStorageKeys)) {
      let parsedJSON;
      try {
        parsedJSON = JSON.parse(value);
      } catch (error) {
        parsedJSON = "";
      }
      if (parsedJSON.length !== 0 && key !== "updateFlag") {
        pairs.push({ name: key, value: parsedJSON });
      }
    }
    setPresets(pairs);
  }, [refreshPresetList]);

  // Modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function handlePresetClick(data) {
    setListToDownload(data.value);
    setActivePreset(data.name);
    handleShow();
  }

  function handlePresetDelete(presetName) {
    handleClose();
    window.localStorage.removeItem(activePreset);
    setRefreshPresetList(!refreshPresetList);
  }

  return (
    <>
      <main role="main" className="container">
        <div className="mt-3">
          <div className="jumbotron home-jumbo mx-auto">
            <div className="text-center">
              <h2>Downloadable Presets</h2>
            </div>
          </div>
          <div className="text-center">
            {presets.length !== 0 ? (
              <PresetList
                handlePresetClick={handlePresetClick}
                listOfPresets={presets}
              />
            ) : (
              <h4 style={{ color: "black" }}> No Presets Saved...</h4>
            )}
          </div>
        </div>
      </main>
      <DownloadModal
        activePreset={activePreset}
        listToDownload={listToDownload}
        handlePresetDelete={handlePresetDelete}
        showModal={showModal}
        handleClose={handleClose}
      />
    </>
  );
}

export default Presets;
