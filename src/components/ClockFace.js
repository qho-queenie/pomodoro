import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TimerPanel from './TimerPanel';

const ClockFace = () => {
  // currentSession is the index of the allSessions array
  const [currentSession, setCurrentSession] = useState(0);
  // AllSession's structure: [[min, sec], [min, sec], [min, sec], [min, sec]]
  // these will be set by the user
  const [allSessions, setAllSessions] = useState([[0, 10], [1, 0], [0, 20], [0, 30]]);

  const handleNextSession = () => {
    if (allSessions.length - 1 === currentSession) {
      // this is the last session, so go back to display the first session, without auto starting
      setCurrentSession(0)
    } else {
      setCurrentSession(currentSession + 1)
    }
  }

  return (
    <div className='ClockFace'>
      <div className='ClockFace__info'>
        <h3>I am a Pomodoro Timer</h3>
        <h4>Session {currentSession + 1} out of {allSessions.length}</h4>
        <h4>current timer length: {allSessions[currentSession][0]} mins and {allSessions[currentSession][1]} seconds</h4>
      </div>
      <TimerPanel
        key={uuidv4()}
        numberOfMinutes={allSessions[currentSession][0]}
        numberOfSeconds={allSessions[currentSession][1]}
        sessionNumber={currentSession}
        markSessionAsComplete={handleNextSession}
      />
    </div>
  )
}

export default ClockFace;
