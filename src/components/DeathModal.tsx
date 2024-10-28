import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { RoomInformations } from "../types/RoomTypes.ts";
import { Link } from "react-router-dom";

const DeathModal: React.FC<{
    open: boolean;
    roomInformations: RoomInformations | null;
}> = ({ open, roomInformations }) => {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Player Death
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Player's score is : {roomInformations?.score}
                </Typography>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 12,
                    }}
                >
                    <Button variant={"contained"} component={Link} to={`/`}>
                        Play again
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default DeathModal;
