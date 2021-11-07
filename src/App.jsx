import React from 'react';
import ClockFace from './components/ClockFace';
import SettingsModal from './components/SettingsModal';
import './App.css';

/**
 * Generates the App div, which contains the entire app
 * @return {ClockFace} The App
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClockFace>
          <SettingsModal />
        </ClockFace>
      </header>
    </div>
  );
}

export default App;
