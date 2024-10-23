import React, { useState } from "react";
import "../styles/redeemCode.css";
import { useMemo } from "react";
import MainPage from "../components/MainPage.tsx";
import backgroundH from "../assets/images/background.gif";
import { Button, Modal, TextField } from "@mui/material";
import GodSelector from "../components/GodSelector.tsx";
import axios from "axios";

const RedeemCode: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [availableGods, setAvailableGods] = useState([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const isValueValid = useMemo(() => {
        return inputValue.length > 0;
    }, [inputValue]);

    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const joinRoom = () => {
        try {
            axios
                .get(`${import.meta.env.VITE_SOCKET_UNITY}room/${inputValue}`)
                .then((res) => {
                    console.log(res);
                    setAvailableGods(res.data.availableGods);
                    setOpen(true);
                });
        } catch (error) {
            console.error(error);
        }
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
                    // component={Link}
                    // to={`/game?player=${inputValue}`}
                    // onClick={handleOpen}
                    onClick={() => joinRoom()}
                    disabled={!isValueValid}
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    Choose your GOD
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <GodSelector
                        availableGods={availableGods}
                        roomCode={inputValue}
                    />
                </Modal>
            </div>
        </MainPage>
    );
};

export default RedeemCode;
