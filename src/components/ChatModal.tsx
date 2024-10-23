import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LightningButton from "./LightningButton";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5))', // Adjust background as needed
    backgroundSize: 'cover',
    color: '#fff',
    borderRadius: '10px',
};

const Chat = ({ socket }) => {
    const [open, setOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            socket.emit("room:message", { message: chatMessage });
            setChatMessage("");
            handleClose();
        }
    };

    return (
        <div>
            <LightningButton text="Envoyer un message" onClick={handleOpen} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: "center" }}>
                            Envoyer votre message
                        </Typography>
                        <Stack id="transition-modal-description" sx={{ gap: 2, width: "100%" }}>
                            <TextField
                                id="standard-basic"
                                fullWidth
                                label="Message"
                                variant="standard"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />
                            <Stack spacing={2} direction="row">
                                <LightningButton text="Envoyer" onClick={handleSendMessage} />
                            </Stack>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default Chat;
