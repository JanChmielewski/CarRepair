// CopyButton.jsx
import React, { useState } from 'react';
import Icons from '../../utils/icons';

function CopyButton({ content }) {
  const [showPopup, setShowPopup] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Unable to copy content: ', error);
      });
  };

  return (
    <div className="copy-popup">
      <button className="copy-btn" onClick={copyToClipboard}>
        <Icons.Copy className="icon pink-icon copy-icon" />
      </button>
      {showPopup && (
        <span className="copy-popuptext">Skopiowano!</span>
      )}
    </div>
  );
}

export default CopyButton;
