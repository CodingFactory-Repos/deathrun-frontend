import React from "react";
import LightningButton from "./LightningButton";
import { Socket } from "socket.io-client";
import { RoomInformations } from "../types/RoomTypes.ts";

interface StartButtonProps {
    socket: Socket;
    roomInformations: RoomInformations;
    setRoomInformations: React.Dispatch<
        React.SetStateAction<RoomInformations | null>
    >;
}

const StartButton: React.FC<StartButtonProps> = ({
    socket,
    roomInformations,
    setRoomInformations,
}) => {
    const handleStartClick = () => {
        socket.emit("rooms:start");
        console.log("Start button clicked, rooms:start event emitted");
        setRoomInformations({ ...roomInformations, started: true });
    };

    return (
        <div>
            <LightningButton text="Start Game" onClick={handleStartClick} />
        </div>
    );
};

export default StartButton;
