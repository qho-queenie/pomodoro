import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const ClockFace = () => {
  const [mainTimerMins, setMainTimerMins] = useState(2);
  const [mainTimerSecs, setMainTimerSecs] = useState(0)
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    let mainTimeInterval;
    if (isActive) {
      mainTimeInterval = setInterval(() => {
        // if there are seconds left
        if (mainTimerSecs > 0) {
          setMainTimerSecs(mainTimerSecs - 1);
        }
        // if there are no seconds and mins left
        if (mainTimerSecs === 0) {
          if (mainTimerMins === 0) {
            clearInterval(mainTimeInterval)
            // if seconds are at 0, but there are mins left
          } else {

            setMainTimerMins(mainTimerMins - 1);
            setMainTimerSecs(59);
          }
        }
      }, 1000)
    }
    else if (!isActive) {
      clearInterval(mainTimeInterval)
    }
    return () => clearInterval(mainTimeInterval)
  }, [isActive, mainTimerSecs]);



  useEffect(() => {
    if (mainTimerSecs === 0 && mainTimerMins === 0) setIsActive(false)
  }, [mainTimerSecs])

  return (
    <div classnames='Clockface'>

      <p>Pomodoro</p>
      <h1>00 : {mainTimerMins < 10 ? `0${mainTimerMins}` : mainTimerMins} : {mainTimerSecs < 10 ? `0${mainTimerSecs}` : mainTimerSecs} </h1>
      <button
        className={classnames('startButton', { isActive })}

        type='button'
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'pause' : 'start'}
      </button>
    </div>

  )
}

export default ClockFace;
