import React, { useState } from "react";
import Rock from "../assets/images/Rock.png";
import Paper from "../assets/images/Paper.png";
import Scissors from "../assets/images/Scissors.png";
import { Box, Button } from "@mui/material";

const RockPaperScissors: React.FC = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const RockPaperScissorsData = [
    {
      id: 1,
      name: "Rock",
      image: Rock,
    },
    {
      id: 2,
      name: "Paper",
      image: Paper,
    },
    {
      id: 3,
      name: "Scissors",
      image: Scissors,
    },
  ];

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <Box sx={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 60,
        }}
      >
        {RockPaperScissorsData.map((datarps) => (
          <div
            key={datarps.id}
            onClick={() => handleSelect(datarps.id)}
            style={{
              width: "30%",
              cursor: "pointer",
              border:
                selectedId === datarps.id
                  ? "3px solid #2196f3"
                  : "3px solid transparent",
              borderRadius: "8px",
              transition: "border 0.1s ease",
            }}
          >
            <img
              src={datarps.image}
              alt={datarps.name}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Button variant="text">Envoyer</Button>
      </div>
    </Box>
  );
};

export default RockPaperScissors;
