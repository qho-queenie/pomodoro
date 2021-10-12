import React, { useState, useEffect } from 'react';
import cx from 'classnames';

const ClockFace = () => {
  const [mainTimer, setMainTimer] = useState(10000);
  const [isActive, setIsActive] = useState(false);

  // const toggleisActive = () => {
  //   setIsActive(prevState => !isActive)
  // }

  useEffect(() => {
    let intervalId;
    if (isActive && mainTimer > 0) {
      intervalId = setInterval(() => {
        setMainTimer(prev => prev - 5000);
      }, 3000);

    } else if (mainTimer < 1) {
      alert('time is up');
      clearInterval(intervalId)

    } else if (!isActive) {
      clearInterval(intervalId)
    }


    return () => clearInterval(intervalId)

  }, [isActive]);

  return (
    <div classnames='Clockface'>

      <p>Pomodoro</p>
      <h1>{mainTimer}</h1>
      <button
        className={cx('startButton', { isActive })}
        type='button'
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'pause' : 'start'}
      </button>
    </div>

  )
}

export default ClockFace;