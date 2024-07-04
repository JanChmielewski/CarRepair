import React, { useState } from 'react';
import './CarParts.css';
import PartsTable from './PartsTable';
import AddPartForm from './AddPartForm';
import Modal from './Modal';

function CarPart() {
  const [parts, setParts] = useState([
    { id: 1, name: 'Filtr oleju', part_num: '12345', price: 30, quantity: 10, description: 'Filtr oleju do Toyoty', car_model: 'Toyota Camry', category: 'ENGINE' },
    { id: 2, name: 'Klocki hamulcowe', part_num: '67890', price: 120, quantity: 15, description: 'Klocki hamulcowe do Forda', car_model: 'Ford Mustang', category: 'BRAKES' },
    { id: 3, name: 'Amortyzator', part_num: '54321', price: 300, quantity: 5, description: 'Amortyzator do BMW', car_model: 'BMW X5', category: 'SUSPENSION' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const addPart = (newPart) => {
    setParts([...parts, { ...newPart, id: parts.length + 1 }]);
  };

  const handleAddPartClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="carpart-container">
      <header className="carpart-header">
        <h1>Zarządzanie częściami w warsztacie samochodowym</h1>
      </header>
      <main>
        <button className="open-modal-button" onClick={handleAddPartClick}>
          Dodaj część
        </button>
        <PartsTable parts={parts} removePart={(id) => setParts(parts.filter(part => part.id !== id))} />
        <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
          <AddPartForm addPart={addPart} onClose={handleCloseModal} />
        </Modal>
      </main>
    </div>
  );
}

export default CarPart;
