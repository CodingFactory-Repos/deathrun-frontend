import React, { useState } from "react";
import "../styles/redeemCode.css";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import MainPage from "../components/MainPage.tsx";

const RedeemCode: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isValueValid = useMemo(() => {
    return inputValue.length > 0;
  }, [inputValue]);

  return (
    <MainPage
      componentStyle={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div className="form-container">
        <h1 className="form-title">Death Run</h1>
        <input
          type="text"
          className="input-field"
          placeholder="Entrer votre identifiant"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Link
          style={{
            textDecoration: "none",
            backgroundColor: isValueValid ? "green" : "red",
          }}
          to={`/game?player=${inputValue}`}
          className="submit-button"
        >
          Join
        </Link>
      </div>
    </MainPage>
  );
};

export default RedeemCode;
