import React, { useState, useContext, useEffect } from "react";
import reactDom from "react-dom";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "./ClockFace.js"
import "./SettingsModal.scss";

const SettingsModal = () => {
  const { isModalOpen, setIsModalOpen, sessions, setSessions } = useContext(ModalContext);
  const [localSessions, setLocalSessions] = useState(sessions);
  const [hasSettingsChanged, setHasSettingsChanged] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setLocalSessions(sessions);
      setHasSettingsChanged(false);
    }
  }, [isModalOpen, sessions])

  if (!isModalOpen) {
    return null;
  }

  const applyAndClose = () => {
    setSessions(localSessions)
    setIsModalOpen(false);
  }

  const handleInputChange = (e) => {
    if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 60 || !e.target.valueAsNumber) {
      return false;
    }
    else {
      setHasSettingsChanged(true);
      if (e.target.name === "longSession") {
        const newSettings = [...localSessions];
        newSettings[0] = e.target.valueAsNumber * 60;
        newSettings[2] = e.target.valueAsNumber * 60;
        setLocalSessions(newSettings);
      }
      else if (e.target.name === "shortSession") {
        const newSettings = [...localSessions];
        newSettings[1] = e.target.valueAsNumber * 60;
        newSettings[3] = e.target.valueAsNumber * 60;
        setLocalSessions(newSettings);
      }
    }
  }

  const formatToMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  }

  return reactDom.createPortal(
    <div className="SettingsModal__overlay">
      <div className="SettingsModal">
        <h2>Settings</h2>
        <div className="SettingsModal__form">
          <label>
            Work:
          </label>
          <input
            key={uuidv4()}
            type="number"
            max="60"
            min="1"
            name="longSession"
            value={formatToMinutes(localSessions[0])}
            onChange={e => handleInputChange(e)}
          >
          </input>
          <label>
            Break:
          </label>
          <input
            key={uuidv4()}
            type="number"
            max="60"
            min="1"
            name="shortSession"
            value={formatToMinutes(localSessions[1])}
            onChange={e => handleInputChange(e)}
          >
          </input>
        </div>
        <div className="SettingsModal__modal-controls">
          <button
            className={classnames("apply-close-button", { hasSettingsChanged })}
            onClick={applyAndClose}
          >
            Apply Settings
          </button>
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div >,

    document.getElementById("portal")
  )
}

export default SettingsModal;
