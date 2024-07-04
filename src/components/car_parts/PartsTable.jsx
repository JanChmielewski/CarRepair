import React from 'react';
import PropTypes from 'prop-types';
import './PartsTable.css'; 
import PartDetails from './PartDetails';

const PartsTable = ({ parts, removePart }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Lista Części</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nazwa części</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(part => (
            <PartDetails key={part.id} part={part} removePart={removePart} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

PartsTable.propTypes = {
  parts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    part_num: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    car_model: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  removePart: PropTypes.func.isRequired,
};

export default PartsTable;
