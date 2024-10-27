import React, { useState, useMemo } from "react";
import "../styles/redeemCode.css";
import MainPage from "../components/MainPage.tsx";
import backgroundH from "../assets/images/background.gif";
import { Button, Modal } from "@mui/material";
import GodSelector from "../components/GodSelector.tsx";
import axios from "axios";
import toast from "react-hot-toast";
import CodeInput from "../components/CodeInput";

const RedeemCode: React.FC = () => {
    const [code, setCode] = useState(["", "", "", ""]);
    const [availableGods, setAvailableGods] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    const handleCodeChange = (updatedCode: string[]) => {
        setCode(updatedCode);
    };

    const isCodeValid = useMemo(() => code.every((digit) => digit.length > 0), [code]);

    const handleClose = () => setOpen(false);

    const joinRoom = () => {
        const roomCode = code.join("");
        axios
            .get(`${import.meta.env.VITE_SOCKET_UNITY}room/${roomCode}`)
            .then((res) => {
                setAvailableGods(res.data.availableGods);
                setOpen(true);
            })
            .catch(() => {
                toast.error("Room not found");
            });
    };

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
            <div className="overlay" />
            <h1 className="title">Godbless</h1>
            <div className="form-container"
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                <h2 className="form-subtitle">Enter the room code:</h2>
                <CodeInput code={code} onCodeChange={handleCodeChange} />
                <Button
                    variant="contained"
                    onClick={joinRoom}
                    disabled={!isCodeValid}
                    className={`submit-button ${isCodeValid ? '' : 'disabled'}`}
                    style={{
                        color: "white",
                        backgroundColor: isCodeValid ? "#5078A0" : "gray",
                        border: "2px solid #5078A0",
                        borderRadius: "10px",
                        padding: "15px 30px",
                        fontSize: "1.8rem",
                        fontFamily: "fantasy",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        cursor: isCodeValid ? "pointer" : "not-allowed",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (isCodeValid) {
                            e.currentTarget.style.backgroundColor = "#6a9cbf";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (isCodeValid) {
                            e.currentTarget.style.backgroundColor = "#5078A0";
                        }
                    }}
                >
                    PICK YOUR GOD
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <GodSelector
                        availableGods={availableGods}
                        roomCode={code.join("")}
                    />
                </Modal>
            </div>
        </MainPage >
    );
};

export default RedeemCode;
