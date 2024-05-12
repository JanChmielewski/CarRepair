// SaveButton.jsx
import React from 'react';
import Icons from '../../../utils/icons';

const SaveButton = ({ onClick }) => {
  return (
    <button className="save-btn" onClick={onClick}>
      <Icons.Save className="icon black-icon save-icon" />
      Save
    </button>
  );
};

export default SaveButton;
