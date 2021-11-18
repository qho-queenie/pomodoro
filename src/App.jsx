import React from 'react';
import ClockFace from './components/ClockFace';
import SettingsModal from './components/SettingsModal';
import './App.css';

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
