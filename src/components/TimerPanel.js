import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

const TimerPanel = ({ numberOfMinutes, numberOfSeconds, sessionNumber, markCompletedSession }) => {
  // belows are local states(to this file), will only be used here, not global
  const [minutes, setMinutes] = useState(numberOfMinutes);
  const [seconds, setSeconds] = useState(numberOfSeconds);

  const checkIfLastSession = () => {
    return sessionNumber > 0 ? true : false;
  }
  // per https://stackoverflow.com/questions/68945060/react-make-usestate-initial-value-conditional
  // it is better to set a conditional initial state in a func, so it wont be evaluated on each component render
  const [isActive, setIsActive] = useState(() => checkIfLastSession());

  useEffect(() => {
    let timeInterval;
    if (isActive) {
      timeInterval = setInterval(() => {
        // if there are seconds left
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        // if there are no seconds and mins left
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
            clearInterval(timeInterval)
            // if seconds are at 0, but there are mins left
          } else {
            // at 0 seconds, minutes is -1 since it has started already
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000)
    } else if (!isActive) {
      clearInterval(timeInterval)
    }
    return () => clearInterval(timeInterval)
  }, [isActive, seconds]);

  useEffect(() => {
    // session is complete, not paused
    if (!isActive && minutes === 0 && seconds === 0) markCompletedSession();
  }, [isActive]);

  return (
    <div classnames='TimerPanel'>
      <h1>00 : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds} </h1>
      <div className={classnames('TimerPanel__clockControls', { isActive })}>
        <button
          className={'TimerPanel__startButton'}
          type='button'
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'pause' : 'start'}
        </button>
      </div>
    </div>
  )
}

export default TimerPanel;
