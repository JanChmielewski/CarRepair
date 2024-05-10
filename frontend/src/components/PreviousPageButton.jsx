import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../utils/icons';

const PreviousPageButton = ({
  buttonColor,
  pageDestination,
  iconClassName = '',
}) => {
  let history = useNavigate();

  const goBack = () => {
    if (pageDestination) {
      history(pageDestination);
    } else {
      history(-1);
    }
  };

  const iconClass =
    buttonColor === 'pink' ? 'pink-icon' : 'black-icon';

  return (
    <button className="icons-btn" onClick={goBack}>
      <Icons.GoBack
        className={`icon ${iconClass} ${iconClassName}`}
      />
    </button>
  );
};

export default PreviousPageButton;
