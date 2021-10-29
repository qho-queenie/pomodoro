import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import SettingsModal from './SettingsModal';

const ClockFace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  // in seconds
  const [sessions, setSessions] = useState([60, 5, 10, 10]);
  const [currentSeconds, setCurrentSeconds] = useState(sessions[currentSessionIndex]);

  useEffect(() => {
    let timeInterval;
    if (isActive) {
      timeInterval = setInterval(() => {
        if (currentSeconds > 0) {
          setCurrentSeconds(currentSeconds - 1);
        } else {
          setIsActive(false);
          clearInterval(timeInterval);
        }
      }, 1000)
    }
    else if (!isActive) {
      clearInterval(timeInterval)
    }
    return () => clearInterval(timeInterval)
  }, [isActive, currentSeconds]);

  useEffect(() => {
    if (isActive && currentSeconds === 0) {
      setCurrentSessionIndex(currentSessionIndex + 1);
    }
    else if (currentSessionIndex === sessions.length) {
      setCurrentSessionIndex(0);
      setIsActive(false)
    }
  }, [currentSeconds, isActive])

  useEffect(() => {
    setCurrentSeconds(sessions[currentSessionIndex])
  }, [currentSessionIndex])

  useEffect(() => {
    if (isModalOpen === true) {
      setIsActive(false);
    }
  }, [isModalOpen])

  return (
    <div className='ClockFace'>
      <div className='ClockFace__info'>
        <h3>I am a Pomodoro Timer</h3>
        <h4>Current Session: {currentSessionIndex + 1}</h4>
        <h4
          className={classnames('timer', { isActive })}
        >
          00 :
          {Math.floor(currentSeconds / 60) < 10 ? `0${Math.floor(currentSeconds / 60)}` : Math.floor(currentSeconds / 60)} :
          {currentSeconds % 60 < 10 ? `0${currentSeconds % 60}` : currentSeconds % 60}</h4>
      </div>

      <div className='ClockFace__controls'>
        <button
          className={'start-button'}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'pause' : 'start'}
        </button>

        <button
          className={'open-settings'}
          onClick={() => setIsModalOpen(true)}
        >
          open settings
        </button>

        <SettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
        </SettingsModal>
      </div>
    </div>
  )
}

export default ClockFace;
