import React, { useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import { ModalContext } from './ClockFace';
import './SettingsModal.scss';

const SettingsModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    sessions,
    setSessions,
  } = useContext(ModalContext);
  const [localSessions, setLocalSessions] = useState(sessions);
  const [hasSettingsChanged, setHasSettingsChanged] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setLocalSessions(sessions);
      setHasSettingsChanged(false);
    }
  }, [isModalOpen, sessions]);

  if (!isModalOpen) {
    return null;
  }

  const applyAndClose = () => {
    setSessions(localSessions);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    // if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 60 || !e.target.valueAsNumber) {
    //   return null;
    // }
    if (e.target.valueAsNumber > 1 || e.target.valueAsNumber < 60 || e.target.valueAsNumber) {
      setHasSettingsChanged(true);
      if (e.target.name === 'longSession') {
        const newSettings = [...localSessions];
        newSettings[0] = e.target.valueAsNumber * 60;
        newSettings[2] = e.target.valueAsNumber * 60;
        setLocalSessions(newSettings);
      } else if (e.target.name === 'shortSession') {
        const newSettings = [...localSessions];
        newSettings[1] = e.target.valueAsNumber * 60;
        newSettings[3] = e.target.valueAsNumber * 60;
        setLocalSessions(newSettings);
      }
    }
  };

  const formatToMinutes = (seconds) => Math.floor(seconds / 60);

  return (
    <div className="SettingsModal__overlay">
      <div className="SettingsModal">
        <h2>Settings</h2>
        <div className="SettingsModal__form">
          <label htmlFor="true">
            Work
            <input
              type="number"
              max="60"
              min="1"
              name="longSession"
              value={formatToMinutes(localSessions[0])}
              onChange={(e) => handleInputChange(e)}
            />
          </label>

          <label htmlFor="true">
            Break:
            <input
              type="number"
              max="60"
              min="1"
              name="shortSession"
              value={formatToMinutes(localSessions[1])}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>

        <div className="SettingsModal__modal-controls">
          <button
            type="button"
            className={classnames('apply-close-button', { hasSettingsChanged })}
            onClick={applyAndClose}
          >
            Apply Settings
          </button>
          <button
            type="button"
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;