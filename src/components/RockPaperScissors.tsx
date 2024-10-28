import React, { useEffect, useState } from "react";
import Rock from "../assets/images/Rock.png";
import Paper from "../assets/images/Paper.png";
import Scissors from "../assets/images/Scissors.png";
import { Box, Modal } from "@mui/material";
import usePlayerPosition from "../hooks/SocketHook";
import toast from "react-hot-toast";

const RockPaperScissors: React.FC<{
    openRps: boolean;
    handleCloseRps: () => void;
}> = ({ openRps, handleCloseRps }) => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        bgcolor: "rgba(30, 30, 30, 0.9)",
        borderRadius: "20px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        p: 4,
        backdropFilter: "blur(10px)",
        border: "2px solid #ffffff",
        zIndex: 2,
    };

    const RockPaperScissorsData = [
        { id: 1, name: "Rock", image: Rock },
        { id: 2, name: "Paper", image: Paper },
        { id: 3, name: "Scissors", image: Scissors },
    ];

    const { socket, rpsResult } = usePlayerPosition();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (rpsResult) {
            toast.dismiss();
            toast(`Opponent selected ${rpsResult.move}`);
            toast(`${rpsResult.result}`);
        }
    }, [rpsResult]);

    const handleSelect = (id: number) => {
        setSelectedId(id);
        handleSend(id);
        handleCloseRps();
        toast.loading("Waiting for opponent...");
    };

    const getNameFromId = (id: number) => {
        return RockPaperScissorsData.find((data) => data.id === id)?.name;
    };

    const handleSend = (id: number | null) => {
        if (id) {
            const move = getNameFromId(id)?.toLowerCase() || "";
            socket.emit("rps:select", { move });
        }
    };

    return (
        <>
            {openRps && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(5px)",
                        zIndex: 1,
                    }}
                />
            )}
            <Modal
                open={openRps}
                onClose={() => {}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2
                        style={{
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: "2rem",
                            fontFamily: "fantasy",
                            marginBottom: "20px",
                        }}
                    >
                        Choose Your Move
                    </h2>
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            top: "-80%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "#1E90FF",
                            fontFamily: "fantasy",
                            fontSize: "4rem",
                            fontWeight: "bold",
                            textAlign: "center",
                            textShadow: "2px 2px 0 rgba(0, 0, 0, 0.7)",
                            animation: "pulse 1.5s infinite", // Apply the pulse animation
                        }}
                    >
                        A mortal strikes the divine! Let them pay the price of
                        their audacity!
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            gap: 40,
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
                                            ? "3px solid #ffffff"
                                            : "3px solid transparent",
                                    borderRadius: "15px",
                                    transition:
                                        "border 0.2s ease, transform 0.2s ease",
                                    backgroundColor:
                                        selectedId === dataRps.id
                                            ? "#444"
                                            : "transparent",
                                    padding: "20px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                                    position: "relative",
                                }}
                            >
                                <img
                                    src={dataRps.image}
                                    alt={dataRps.name}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        transition: "transform 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "scale(1)";
                                    }}
                                />
                                <p
                                    style={{
                                        color: "#ffffff",
                                        marginTop: "10px",
                                        fontSize: "2.5rem",
                                        fontFamily: "fantasy",
                                    }}
                                >
                                    {dataRps.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default RockPaperScissors;
