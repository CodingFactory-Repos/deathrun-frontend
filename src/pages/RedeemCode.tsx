import React, { useState } from "react";
import "../styles/redeemCode.css";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import MainPage from "../components/MainPage.tsx";
import backgroundH from "../assets/background.gif";
import { Button, TextField } from "@mui/material";

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
        backgroundImage: `url(${backgroundH})`,
        backgroundSize: "cover",
      }}
    >
      <div className="form-container">
        <h1 className="form-title">LoopTrap</h1>
        <TextField
          id="outlined-basic"
          label="Room Code"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          style={{ marginBottom: 20 }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "lightblue",
              },
              "&.Mui-focused fieldset": {
                borderColor: "lightblue",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "lightblue",
            },
            input: { color: "white" },
          }}
        />
        <Button
          variant="contained"
          component={Link}
          to={`/game?player=${inputValue}`}
          disabled={!isValueValid}
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Be a GOD
        </Button>
      </div>
    </MainPage>
  );
};

export default RedeemCode;
