import React, { useState } from 'react';
import './CarParts.css';
import PartsTable from './PartsTable';
import AddPartForm from './AddPartForm';
import Modal from './Modal';

function CarPart() {
  const [parts, setParts] = useState([
    { id: 1, name: 'Filtr oleju', quantity: 10, price: 30, carMake: 'Toyota' },
    { id: 2, name: 'Klocki hamulcowe', quantity: 15, price: 120, carMake: 'Ford' },
    { id: 3, name: 'Amortyzator', quantity: 5, price: 300, carMake: 'BMW' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const addPart = (newPart) => {
    setParts([...parts, { ...newPart, id: parts.length + 1 }]);
  };

  const removePart = (id) => {
    setParts(parts.filter(part => part.id !== id));
  };

  const handleAddPartClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="CarPart">
      <header className="CarPart-header">
        <h1>Zarządzanie częściami w warsztacie samochodowym</h1>
      </header>
      <main>
        <button className="open-modal-button" onClick={handleAddPartClick}>
          Dodaj część
        </button>
        <PartsTable parts={parts} removePart={removePart} />
        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
          <AddPartForm addPart={addPart} onClose={handleCloseModal} />
        </Modal>
      </main>
    </div>
  );
}

export default CarPart;
