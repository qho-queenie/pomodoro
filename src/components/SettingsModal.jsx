import React, { useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
    if (e.target.valueAsNumber < 1 || e.target.valueAsNumber > 60 || !e.target.valueAsNumber) {
      return null;
    }
    if (e.target.name === 'longSession') {
      setHasSettingsChanged(true);
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
    return null;
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
              max="60"
              min="1"
              name="longSession"
              type="number"
              value={formatToMinutes(localSessions[0])}
              onChange={(e) => handleInputChange(e)}
            />
          </label>

          <label htmlFor="true">
            Break:
            <input
              max="60"
              min="1"
              name="shortSession"
              type="number"
              value={formatToMinutes(localSessions[1])}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </div>

        <div className="SettingsModal__modal-controls">
          <button
            className={classnames('apply-close-button', { hasSettingsChanged })}
            type="button"
            onClick={applyAndClose}
          >
            Apply Settings
          </button>
          <button
            className="close-button"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

ModalContext.propTypes = {
  isModalOpen: PropTypes.boolean,
  setIsModalOpen: PropTypes.func.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSessions: PropTypes.func.isRequired,
};

export default SettingsModal;
