import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../utils/icons';

const PreviousPageButton = ({ buttonColor }) => {
  let history = useNavigate();

  const goBack = () => {
    history(-1);
  };

  const iconClass =
    buttonColor === 'pink' ? 'pink-icon' : 'black-icon';

  return (
    <button className="icons-btn" onClick={goBack}>
      <Icons.GoBack className={`icon ${iconClass}`} />
    </button>
  );
};

export default PreviousPageButton;
