// StartButton.tsx
import React from "react";
import LightningButton from "./LightningButton";
import { Socket } from "socket.io-client";

interface StartButtonProps {
    socket: Socket;
}

const StartButton: React.FC<StartButtonProps> = ({ socket }) => {
    const handleStartClick = () => {
        socket.emit("rooms:start");
        console.log("Start button clicked, rooms:start event emitted");
    };

    return (
        <div>
            <LightningButton text="Commencer la partie" onClick={handleStartClick} />
        </div>
    );
};

export default StartButton;
