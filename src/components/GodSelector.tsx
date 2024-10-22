import { forwardRef, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Greed from "../assets/images/gods/Greed.png";
import Chaos from "../assets/images/gods/Chaos.png";
import Gluttony from "../assets/images/gods/Gluttony.png";
import Envy from "../assets/images/gods/Envy.png";
import Death from "../assets/images/gods/Death.png";
import Vanity from "../assets/images/gods/Vanity.png";
import Sloth from "../assets/images/gods/Sloth.png";

import { GodData, GodSelectorProps } from "../types/GodTypes.ts";
import axios from "axios";
import toast from "react-hot-toast";

let godData: GodData = [
  {
    id: 1,
    godName: "Greed",
    image: Greed,
    description: "Greed",
    disabled: false,
  },
  {
    id: 2,
    godName: "Chaos",
    image: Chaos,
    description: "Chaos",
    disabled: false,
  },
  {
    id: 3,
    godName: "Gluttony",
    image: Gluttony,
    description: "Gluttony",
    disabled: false,
  },
  { id: 4, godName: "Envy", image: Envy, description: "Envy", disabled: false },
  {
    id: 5,
    godName: "Death",
    image: Death,
    description: "Death",
    disabled: false,
  },
  {
    id: 6,
    godName: "Vanity",
    image: Vanity,
    description: "Vanity",
    disabled: false,
  },
  {
    id: 7,
    godName: "Sloth",
    image: Sloth,
    description: "Sloth",
    disabled: false,
  },
];

const GodSelector = forwardRef<HTMLDivElement, GodSelectorProps>(
  ({ availableGods, roomCode }) => {
    const navigate = useNavigate();
    const [selectedGod, setSelectedGod] = useState<number | undefined>(
      undefined,
    );

    const handleSelectGod = (id: number) => {
      setSelectedGod(id);
    };

    const checkGod = async (roomCode: string, selectedGod: number) => {
      try {
        const res = await axios.get(`http://localhost:3000/room/${roomCode}`);
        console.log(res.data, "rere");
        if (res.data.availableGods.includes(selectedGod)) {
          navigate(`/game?player=${roomCode}`, {
            state: { godId: selectedGod },
          });
        } else {
          toast.error("God already in the room");
          godData = godData.map((god) => {
            if (!res.data.availableGods.includes(god.id)) {
              return { ...god, disabled: true };
            }
            return god;
          });
          console.log("availableGods in useEffect", availableGods);
        }
      } catch (error) {
        console.error(error);
      }
    };

    console.log("availableGods", availableGods);
    console.log("roomCode", roomCode);

    godData = godData.map((god) => {
      if (!availableGods.includes(god.id)) {
        return { ...god, disabled: true };
      }
      return god;
    });

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          gap: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Select Your God
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {godData.map((god) => (
            <Box
              key={god.id}
              onClick={() => !god.disabled && handleSelectGod(god.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: god.disabled ? "not-allowed" : "pointer",
                border:
                  selectedGod === god.id
                    ? "3px solid blue"
                    : "3px solid transparent",
                borderRadius: "8px",
                padding: "8px",
                opacity: god.disabled ? 0.5 : 1,
                transition: "border 0.3s",
              }}
            >
              <img src={god.image} alt={god.godName} style={{ height: 60 }} />
              <Typography>{god.godName}</Typography>
            </Box>
          ))}
        </Box>

        <div>
          {selectedGod !== undefined && (
            <Typography>{godData[selectedGod - 1].description}</Typography>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            // component={Link}
            // to={`/game?player=${selectedGod}`}
            // to={`/game?player=test`}
            // state={{ godId: selectedGod }}
            onClick={() =>
              selectedGod !== undefined && checkGod(roomCode, selectedGod)
            }
            disabled={!selectedGod}
            style={{ color: "white", textDecoration: "none" }}
          >
            Be a GOD
          </Button>
        </div>
      </Box>
    );
  },
);

export default GodSelector;
