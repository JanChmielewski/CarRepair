import React, { useState } from 'react';

const AddPartForm = ({ addPart, onClose }) => {
  const [part, setPart] = useState({
    name: '',
    quantity: '',
    price: '',
    carMake: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart({ ...part, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (part.name && part.quantity && part.price && part.carMake) {
      addPart(part);
      setPart({ name: '', quantity: '', price: '', carMake: '' });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nazwa części"
        value={part.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Ilość"
        value={part.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Cena"
        value={part.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="carMake"
        placeholder="Marka samochodu"
        value={part.carMake}
        onChange={handleChange}
      />
      <button type="submit">Dodaj część</button>
    </form>
  );
};

export default AddPartForm;
