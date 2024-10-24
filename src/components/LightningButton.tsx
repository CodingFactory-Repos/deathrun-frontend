import React from 'react';
import '../styles/LightningButton.css';

const LightningButton = ({ text, onClick }) => {
    return (
        <button className="lightning-button" onClick={onClick}>
            {text}
            <span className="lightning-effect" />
        </button>
    );
};

export default LightningButton;
