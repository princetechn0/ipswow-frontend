import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { CollapsibleRow, displayName } from "./Table";
import { useState } from "react";

export default function DownloadModal({
  activePreset,
  listToDownload,
  showModal,
  handleClose,
  handlePresetDelete,
}) {
  const [showPreset, setShowPreset] = useState(() => false);
  const [presetValue, setPresetValue] = useState(() => "");

  function resetModal() {
    handleClose();
    setShowPreset(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (presetValue) {
      const cleanedPreset = presetValue.trim();
      window.localStorage.setItem(
        cleanedPreset,
        JSON.stringify(listToDownload)
      );
      setPresetValue("");
    }
  }

  function handleEnterKey(event) {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  }

  return (
    <Modal show={showModal} onHide={resetModal}>
      <Modal.Header>
        <Modal.Title>Summary of your downloads...</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body text-center">
        <table id="modal-table" className="table table-sm no-top-border">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="col">
                Device Name
              </th>
              <th scope="col">Latest Firmware</th>
            </tr>
          </thead>
          <tbody id="modal-table-body">
            {listToDownload.map((data, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td>
                    {data.name.split("/").length > 2 ? (
                      <CollapsibleRow name={data.name} />
                    ) : (
                      displayName(data.name)
                    )}
                  </td>
                  <td>{data.firmware}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Modal.Body>
      <div className="modalFooter">
        {!activePreset ? (
          !showPreset ? (
            <Button variant="primary" onClick={() => setShowPreset(true)}>
              Create Preset
            </Button>
          ) : (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a Preset Name"
                aria-label="Enter a Preset Name"
                aria-describedby="button-addon2"
                value={presetValue}
                onChange={(event) => setPresetValue(event.target.value)}
                onKeyDown={handleEnterKey}
              />
              <div className="input-group-append">
                <button
                  onClick={handleSubmit}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Download
                </button>
              </div>
            </div>
          )
        ) : (
          <Button
            variant="danger"
            onClick={() => handlePresetDelete(activePreset)}
          >
            Delete Preset
          </Button>
        )}
        <Button variant="secondary" onClick={resetModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleOnDownload(listToDownload, resetModal)}
        >
          Download!
        </Button>
      </div>
    </Modal>
  );
}

function handleOnDownload(listToDownload, resetModal) {
  const copiedDownloadList = [...listToDownload];
  const interval = setInterval(download, 1500, copiedDownloadList);

  function download(copiedDownloadList) {
    const { url } = copiedDownloadList.pop();

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_parent");
    a.click();

    if (copiedDownloadList.length === 0) {
      clearInterval(interval);
      resetModal();
    }
  }
}
