import React, { useState, useEffect, createContext } from "react";
import classnames from "classnames";
import SettingsModal from "./SettingsModal";

// variables outside components are the ones that don"t change, or as helper functions exposure

export const ModalContext = createContext();

const ClockFace = () => {
  const [sessions, setSessions] = useState([65, 5]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(sessions[0]);

  const settingsModalValues = {
    isModalOpen, setIsModalOpen, sessions, setSessions
  }

  useEffect(() => {
    let timeInterval;
    if (isActive) {
      timeInterval = setInterval(() => {
        if (currentSeconds > 0) {
          setCurrentSeconds(currentSeconds - 1);
        } else if (currentSeconds === 0) {
          // current session complete: 
          // last session, set back to 1st session
          if (currentSessionIndex + 1 === sessions.length) {
            setCurrentSessionIndex(0);
            setIsActive(false);
          } else {
            // moving to the next session
            setCurrentSessionIndex(currentSessionIndex + 1);
          }
          clearInterval(timeInterval);
        }
      }, 1000)
    } else if (!isActive) {
      clearInterval(timeInterval)
    }
    return () => clearInterval(timeInterval)
  }, [isActive, currentSeconds]);

  useEffect(() => {
    setCurrentSeconds(sessions[currentSessionIndex])
  }, [currentSessionIndex]);

  useEffect(() => {
    // whenever sessions has been changed by user, start with 1st session
    setCurrentSeconds(sessions[0])
  }, [sessions]);

  useEffect(() => {
    if (isModalOpen === true) {
      setIsActive(false);

    }
  }, [isModalOpen]);

  const formattedMinutes = Math.floor(currentSeconds / 60) < 10 ? `0${Math.floor(currentSeconds / 60)}` : Math.floor(currentSeconds / 60);
  const formattedSeconds = currentSeconds % 60 < 10 ? `0${currentSeconds % 60}` : currentSeconds % 60

  return (
    <div className="ClockFace">
      <div className="ClockFace__info">
        <h3>I am a Pomodoro Timer</h3>
        <h4>Current Session: {currentSessionIndex + 1}</h4>
        <h4
          className={classnames("timer", { isActive })}
        >
          00 :
          {formattedMinutes} :
          {formattedSeconds}
        </h4>
      </div>

      <div className="ClockFace__controls">
        <button
          className="start-button"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "pause" : "start"}
        </button>

        <button
          className="open-settings"
          onClick={() => setIsModalOpen(true)}
        >
          open settings
        </button>

        <ModalContext.Provider value={settingsModalValues}>
          <SettingsModal />
        </ModalContext.Provider>
      </div>
    </div>
  )
}

export default ClockFace;
