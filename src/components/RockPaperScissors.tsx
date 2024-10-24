import React, { useEffect, useState } from "react";
import Rock from "../assets/images/Rock.png";
import Paper from "../assets/images/Paper.png";
import Scissors from "../assets/images/Scissors.png";
import { Box, Button, Modal, Snackbar, Alert } from "@mui/material";
import usePlayerPosition from "../hooks/SocketHook";

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

    const { socket, rpsResult } = usePlayerPosition();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [resultMessage, setResultMessage] = useState<string | null>(null);

    useEffect(() => {
        console.log(rpsResult);
        if (rpsResult) {
            setResultMessage(`Result: ${rpsResult.result}`);
            setOpenSnackbar(true);
        }
    }, [rpsResult]);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        handleSend(id);
        handleCloseRps();
    };

    const getNameFromId = (id: number) => {
        const selected = RockPaperScissorsData.find((data) => data.id === id);
        return selected?.name;
    };

    const handleSend = (id: number | null) => {
        if (id) {
            const name: string = getNameFromId(id) || "";
            const move = name.toLowerCase();
            socket.emit("rps:select", { move });
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
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
                </Box>
            </Modal>


            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="info">
                    {resultMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default RockPaperScissors;
