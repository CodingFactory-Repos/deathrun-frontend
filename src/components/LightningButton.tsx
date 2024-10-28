import "../styles/LightningButton.css";

// @ts-ignore
const LightningButton = ({ text, onClick }) => {
    return (
        <button className="lightning-button" onClick={onClick}>
            {text}
            <span className="lightning-effect" />
        </button>
    );
};

export default LightningButton;
