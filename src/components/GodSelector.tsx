import { forwardRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
import "../styles/GodSelector.css";

let godData: GodData = [
    {
        id: 1,
        godName: "Greed",
        image: Greed,
        description: "The insatiable God of Greed, forever driven by an unquenchable thirst for wealth and power. He whispers temptations of riches, ensnaring mortals in a web of desire.",
        catchphrase: "More is never enough. Seize your fortune !",
        disabled: false
    },
    {
        id: 2,
        godName: "Chaos",
        image: Chaos,
        description: "The unpredictable God of Chaos, reveling in disorder and upheaval. He thrives in the tumult of conflict, where rules are shattered and madness reigns supreme.",
        catchphrase: "In the storm of life, I am the eye. Embrace the chaos !",
        disabled: false
    },
    {
        id: 3,
        godName: "Gluttony",
        image: Gluttony,
        description: "The indulgent God of Gluttony, forever feasting on excess and pleasure. He embodies the relentless pursuit of satisfaction, urging mortals to indulge without restraint.",
        catchphrase: "Savor every bite. Indulgence is the true feast !",
        disabled: false
    },
    {
        id: 4,
        godName: "Envy",
        image: Envy,
        description: "The bitter God of Envy, eternally yearning for what others possess. He sows seeds of discontent, turning hearts against one another in a relentless quest for what is not theirs.",
        catchphrase: "What you desire is within reach. Claim it for yourself!",
        disabled: false
    },
    {
        id: 5,
        godName: "Death",
        image: Death,
        description: "The inevitable God of Death, the harbinger of endings and new beginnings. He stands as a solemn reminder that all things must pass, guiding souls to their final rest.",
        catchphrase: "Every end is a new beginning. Welcome the inevitable !",
        disabled: false
    },
    {
        id: 6,
        godName: "Vanity",
        image: Vanity,
        description: "The alluring God of Vanity, obsessed with beauty and perfection. She captivates with her charm, leading mortals to worship their own reflections and lose themselves in superficiality.",
        catchphrase: "Let your beauty shine. Dare to be the center of attention !",
        disabled: false
    },
    {
        id: 7,
        godName: "Sloth",
        image: Sloth,
        description: "The languid God of Sloth, embodying the essence of laziness and apathy. He encourages a life of leisure, where ambition fades and comfort reigns supreme.",
        catchphrase: "Why rush ? Relax and let the world come to you !",
        disabled: false
    },
];

const GodSelector = forwardRef<HTMLDivElement, GodSelectorProps>(
    ({ availableGods, roomCode }) => {
        const navigate = useNavigate();
        const [selectedGod, setSelectedGod] = useState<number | undefined>(undefined);
        const [hoveredGod, setHoveredGod] = useState<number | undefined>(undefined);

        const handleSelectGod = (id: number) => setSelectedGod(id);

        const checkGod = async (roomCode: string, selectedGod: number) => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SOCKET_UNITY}room/${roomCode}`);
                if (res.data.availableGods.includes(selectedGod)) {
                    navigate(`/game?player=${roomCode}`, { state: { godId: selectedGod } });
                } else {
                    toast.error("God already in the room");
                    godData = godData.map((god) =>
                        !res.data.availableGods.includes(god.id) ? { ...god, disabled: true } : god
                    );
                }
            } catch (error) {
                console.error(error);
            }
        };

        godData = godData.map((god) => (!availableGods.includes(god.id) ? { ...god, disabled: true } : god));

        return (
            <Box className="god-selector-container">
                <Box className="god-grid">
                    {godData.map((god) => (
                        <Box
                            key={god.id}
                            onClick={() => !god.disabled && handleSelectGod(god.id)}
                            onMouseEnter={() => setHoveredGod(god.id)}
                            onMouseLeave={() => setHoveredGod(undefined)}
                            className={`god-item ${selectedGod === god.id ? "selected" : ""} ${god.disabled ? "disabled" : ""}`}
                        >
                            <img src={god.image} alt={god.godName} className="god-image" />
                            <Typography variant="h3" style={{ marginTop: "5%" }} fontFamily="fantasy" className="god-name">
                                {god.godName}
                            </Typography>
                            {hoveredGod === god.id && (
                                <Box className="tooltip">
                                    <Typography className="tooltip-title" style={{ fontFamily: "fantasy", fontSize: "2rem" }}>{god.godName}</Typography>
                                    <Typography className="tooltip-description" style={{ fontFamily: "fantasy", fontSize: "1em" }}>{god.description}</Typography>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
                <div className="button-container">
                    <Button
                        variant="contained"
                        onClick={() => selectedGod !== undefined && checkGod(roomCode, selectedGod)}
                        disabled={!selectedGod}
                        style={{
                            backgroundColor: selectedGod !== undefined ? "#5078A0" : "gray",
                            color: "white",
                            width: "100%",
                            fontSize: "1.5rem",
                            fontFamily: "fantasy",
                        }}
                    >
                        {selectedGod !== undefined ? godData[selectedGod - 1].catchphrase : "Be a GOD"}
                    </Button>
                </div>
            </Box>
        );
    }
);

export default GodSelector;
