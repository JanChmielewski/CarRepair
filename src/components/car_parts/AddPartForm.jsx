import React, { useState } from 'react';
import './AddPartForm.css';

const AddPartForm = ({ addPart, onClose }) => {
  const [part, setPart] = useState({ name: '', part_num: '', price: '', quantity: '', description: '', car_model: '', category: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart({ ...part, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (part.name && part.part_num && part.price && part.quantity && part.description && part.car_model && part.category) {
      addPart(part);
      setPart({ name: '', part_num: '', price: '', quantity: '', description: '', car_model: '', category: '' });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-part-form">
      <input
        type="text"
        name="name"
        placeholder="Nazwa części"
        value={part.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="part_num"
        placeholder="Numer części"
        value={part.part_num}
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
        type="number"
        name="quantity"
        placeholder="Ilość na stanie"
        value={part.quantity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Opis"
        value={part.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="car_model"
        placeholder="Model samochodu"
        value={part.car_model}
        onChange={handleChange}
      />
      <select
        name="category"
        value={part.category}
        onChange={handleChange}
      >
        <option value="">Wybierz kategorię</option>
        <option value="ENGINE">Silnik</option>
        <option value="TIRES">Koła</option>
        <option value="BRAKES">Hamulce</option>
        <option value="ELECTRICAL">Elektryka</option>
        <option value="BODY">Karoseria</option>
        <option value="EXHAUST">Układ wydechowy</option>
      </select>
      <button type="submit" className="submit-button">Dodaj część</button>
    </form>
  );
};

export default AddPartForm;
