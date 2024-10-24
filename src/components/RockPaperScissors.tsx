import React, { useState } from "react";
import Rock from "../assets/images/Rock.png";
import Paper from "../assets/images/Paper.png";
import Scissors from "../assets/images/Scissors.png";
import { Box, Button, Modal } from "@mui/material";

const RockPaperScissors: React.FC<{
    openRps: boolean;
    handleCloseRps: () => void;
}> = ({ openRps, handleCloseRps }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 400,
        bgcolor: "background.paper",
        borderRadius: "10px",
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
        <Modal
            open={openRps}
            onClose={handleCloseRps}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 60,
                    }}
                >
                    {RockPaperScissorsData.map((dataRps) => (
                        <div
                            key={dataRps.id}
                            onClick={() => handleSelect(dataRps.id)}
                            style={{
                                width: "30%",
                                cursor: "pointer",
                                border:
                                    selectedId === dataRps.id
                                        ? "3px solid #2196f3"
                                        : "3px solid transparent",
                                borderRadius: "8px",
                                transition: "border 0.1s ease",
                            }}
                        >
                            <img
                                src={dataRps.image}
                                alt={dataRps.name}
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
        </Modal>
    );
};

export default RockPaperScissors;
