import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import usePlayerPosition from "../hooks/SocketHook.tsx";

interface FrameDisplayProps {
    socket: Socket;
}

const FrameDisplay: React.FC<FrameDisplayProps> = ({ socket }) => {
    const { cameraFrame } = usePlayerPosition();
    const [frame, setFrame] = useState(cameraFrame);

    useEffect(() => {
        setFrame(cameraFrame);
    }, [cameraFrame]);

    return (
        <div>
            {frame ? <img src={`data:image/jpeg;base64,${frame}`} alt="Camera Frame" /> : <p>No frame received</p>}
        </div>
    );
};

export default FrameDisplay;