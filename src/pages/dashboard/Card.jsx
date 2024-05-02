import React from 'react';

const Card = ({ model, owner, date }) => {
  return (
    <div className="card">
      <ul className="car-data">
        <li>Model: {model}</li>
        <li>Owner: {owner}</li>
        <li>Date: {date}</li>
      </ul>
    </div>
  );
};

export default Card;
