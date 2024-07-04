import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PartDetails.css'; 

const PartDetails = ({ part, removePart }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <React.Fragment>
      <tr className="part-summary" onClick={toggleExpand}>
        <td>{part.name}</td>
        <td>
          <button onClick={() => removePart(part.id)}>Usuń</button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="part-details">
          <td colSpan="2">
            <div><strong>Numer Części:</strong> {part.part_num}</div>
            <div><strong>Cena:</strong> {part.price}</div>
            <div><strong>Ilość na stanie:</strong> {part.quantity}</div>
            <div><strong>Opis:</strong> {part.description}</div>
            <div><strong>Model Samochodu:</strong> {part.car_model}</div>
            <div><strong>Kategoria:</strong> {part.category}</div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

PartDetails.propTypes = {
  part: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    part_num: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    car_model: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  removePart: PropTypes.func.isRequired,
};

export default PartDetails;
