import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CircularProgressBar } from './CircularProgressBar';
import './ClockFace.scss';

export const ModalContext = createContext();

const ClockFace = (props) => {
  const [sessions, setSessions] = useState([1500, 300, 1500, 300]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(sessions[0]);

  const [totalSeconds, setTotalSeconds] = useState(currentSeconds);
  const progress = (currentSeconds / totalSeconds) * 100;

  const { children } = props;

  const settingsModalValues = {
    isModalOpen, setIsModalOpen, sessions, setSessions,
  };

  useEffect(() => {
    let timeInterval;
    if (isActive) {
      timeInterval = setInterval(() => {
        if (currentSeconds > 0) {
          setCurrentSeconds(currentSeconds - 1);
        } else if (currentSeconds === 0) {
          if (currentSessionIndex + 1 === sessions.length) {
            setCurrentSessionIndex(0);
            setIsActive(false);
          } else {
            setCurrentSessionIndex(currentSessionIndex + 1);
          }
          setCurrentSeconds(sessions[currentSessionIndex]);
          clearInterval(timeInterval);
        }
      }, 1000);
    } else if (!isActive) {
      clearInterval(timeInterval);
    }
    return () => clearInterval(timeInterval);
  }, [isActive, currentSeconds, currentSessionIndex, sessions]);

  useEffect(() => {
    setCurrentSeconds(sessions[currentSessionIndex]);
  }, [sessions, currentSessionIndex]);

  useEffect(() => {
    setTotalSeconds(sessions[currentSessionIndex]);
  }, [currentSessionIndex, sessions, currentSeconds]);

  useEffect(() => {
    setCurrentSessionIndex(0);
    setCurrentSeconds(sessions[0]);
  }, [sessions]);

  useEffect(() => {
    if (isModalOpen === true) {
      setIsActive(false);
    }
  }, [isModalOpen]);

  const formattedMinutes = Math.floor(currentSeconds / 60);
  const formattedSeconds = currentSeconds % 60;

  return (
    <div className="ClockFace">
      <div className="ClockFace__info">
        <h3>I am a Pomodoro Timer</h3>
        <h4>
          Current Session:
          {currentSessionIndex + 1}
        </h4>
        <CircularProgressBar
          className="sessionProgressBar"
          radius={200}
          stroke={15}
          progress={progress}
        />
        <h4
          className={classnames('ClockFace__timer', { isActive })}
        >
          00 :
          {formattedMinutes < 10 ? `0${formattedMinutes}` : formattedMinutes}
          {' '}
          :
          {formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds}
        </h4>
      </div>

      <div className="ClockFace__controls">
        <button
          type="button"
          className={classnames('ClockFace__start-button', { isActive })}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'pause' : 'start'}
        </button>

        <button
          type="button"
          className="ClockFace__open-settings-button"
          onClick={() => setIsModalOpen(true)}
        >
          open settings
        </button>

        <div>
          <ModalContext.Provider value={settingsModalValues}>
            {children}
          </ModalContext.Provider>
        </div>
      </div>
    </div>
  );
};

ClockFace.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClockFace;
