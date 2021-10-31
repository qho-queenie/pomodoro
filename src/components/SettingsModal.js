import React, { useState, useContext } from "react";
import reactDom from "react-dom";
import { v4 as uuidv4 } from 'uuid';
import "./SettingsModal.scss";
import { Context } from './ClockFace.js'


const SettingsModal = () => {
  const { isModalOpen, sessions } = useContext(Context);
  const [thisModalOpen, setThisModalOpen] = isModalOpen;
  const [currentSessions, setCurrentSessions] = sessions;
  const [localSession, setLocalSession] = useState(currentSessions);

  if (!thisModalOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    if (e.target.name === "longSession") {
      const newSettings = [...localSession];
      newSettings[0] = e.target.valueAsNumber;
      setLocalSession(newSettings);
    }
    else if (e.target.name === "shortSession") {
      const newSettings = [...localSession];
      newSettings[1] = e.target.valueAsNumber
      setLocalSession(newSettings);
    }
  }

  return reactDom.createPortal(
    <div className="SettingsModal__overlay">
      <div className="SettingsModal">
        <h3>Settings</h3>
        <div className="SettingsModal__form">
          <input
            key={uuidv4()}
            type="number"
            max='60'
            min='0'
            name="longSession"
            value={localSession[0]}
            onChange={e => handleInputChange(e)}
          >
          </input>
          <input
            key={uuidv4()}
            type="number"
            max='60'
            min='0'
            name="shortSession"
            value={localSession[1]}
            onChange={e => handleInputChange(e)}
          >
          </input>

          <button
            className="applySettings-button"
            onClick={() => setCurrentSessions(localSession)}
          >
            Apply Settings
          </button>

          <button
            className="close-button"
            onClick={() => setThisModalOpen(false)}
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
