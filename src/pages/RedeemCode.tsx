import React, { useState } from 'react';
import '../styles/style.css'; 

const RedeemCode: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  console.log(inputValue)

  return (
    <div className="form-container">
      <h1 className="form-title">Death Run</h1>
      <input
        type="text"
        className="input-field"
        placeholder="Entrer votre identifiant"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="submit-button">Rejoindre</button>
    </div>
  );
};

export default RedeemCode;
