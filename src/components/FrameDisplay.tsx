import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import usePlayerPosition from "../hooks/SocketHook.tsx";

interface FrameDisplayProps {
    socket: Socket;
}

const FrameDisplay: React.FC<FrameDisplayProps> = () => {
    const { cameraFrame } = usePlayerPosition();
    const [frame, setFrame] = useState(cameraFrame);

    useEffect(() => {
        setFrame(cameraFrame);
    }, [cameraFrame]);

    return (
        <div style={styles.container}>
            {frame ? (
                <img
                    src={`data:image/jpeg;base64,${frame}`}
                    alt="Camera Frame"
                    style={styles.image}
                />
            ) : (
                <p style={styles.text}>No frame received</p>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "1rem",
        boxSizing: "border-box",
    },
    image: {
        width: "100%",
        maxWidth: "800px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    text: {
        color: "#fff",
        fontSize: "1.2rem",
        textAlign: "center",
    },
};

export default FrameDisplay;
