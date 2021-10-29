import React from 'react'
import reactDom from 'react-dom';
import './SettingsModal.scss';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return reactDom.createPortal(
    <div className={'SettingsModal__overlay'}>
      <div className={'SettingsModal'}>
        <h3>Settings</h3>
        <button
          className={'close-button'}
          onClick={onClose}
        >
          Apply Settings
        </button>
      </div>
    </div>,

    document.getElementById('portal')
  )
}

export default SettingsModal;
