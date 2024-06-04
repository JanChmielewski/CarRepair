import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PartsTable = ({ parts, removePart }) => {
  const [error, setError] = useState(null);

  const handleRemovePart = (id) => {
    try {
      removePart(id);
    } catch (err) {
      setError('Wystąpił błąd podczas usuwania części.');
    }
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Lista Części</h2>
      {error && <p className="error-message red">{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Nazwa części</th>
            <th>Ilość</th>
            <th>Cena</th>
            <th>Marka samochodu</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.quantity}</td>
              <td>{part.price}</td>
              <td>{part.carMake}</td>
              <td>
                <button onClick={() => handleRemovePart(part.id)}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

PartsTable.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      carMake: PropTypes.string.isRequired,
    })
  ).isRequired,
  removePart: PropTypes.func.isRequired,
};

export default PartsTable;
