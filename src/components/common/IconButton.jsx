import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IconButton({
  icon: IconComponent,
  destination = '/calendar',
  onClick,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(destination);
    }
  };

  return (
    <button className="icons-btn" onClick={handleClick}>
      <IconComponent className="black-icon icon" />
    </button>
  );
}
