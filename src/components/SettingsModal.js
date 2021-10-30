import React, { useContext } from "react";
import reactDom from "react-dom";
import "./SettingsModal.scss";
import { Context } from './ClockFace.js'


const SettingsModal = () => {
  const { isOpen, sessionLengths, setSessions, setIsModalOpen } = useContext(Context);
  if (!isOpen) {
    return null;
  }

  return reactDom.createPortal(
    <div className="SettingsModal__overlay">
      <div className="SettingsModal">
        <h3>Settings</h3>
        <span>value : {sessionLengths}</span>
        <button
          className="close-button"
          onClick={() => setIsModalOpen(false)}
        >
          Apply Settings
        </button>
      </div>
    </div>,

    document.getElementById("portal")
  )
}

export default SettingsModal;
