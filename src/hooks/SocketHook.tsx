import { useEffect, useState } from "react";
// @ts-ignore
import { socket } from "../socket";

function usePlayerPosition() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [traps, setTraps] = useState([{ x: 0, y: 0 }]);
    const [showPlayer, setShowPlayer] = useState(false);
    const [cameraFrame, setCameraFrame] = useState("");
    const [rpsResult, setRpsResult] = useState<{
        result: string;
        move: string;
    } | null>(null);
    const [rpsStart, setRpsStart] = useState(false);

    useEffect(() => {
        function onConnect() {
            // console.log("Connected");
            setIsConnected(true);

            // socket.emit("traps:request", {
            //   x: 1,
            //   y: 4,
            //   trapType: "crossbow_down_prefab",
            // });
            //
            // console.log("traps:request");
        }

        function onDisconnect() {
            // console.log("Disconnected");
            setIsConnected(false);
        }

        function onPositionChange(data: { x: number; y: number }) {
            // console.log("Position change", data);
            setPosition({ x: Math.floor(data.x), y: Math.floor(data.y) });
        }

        function onTrapsList(data: { x: number; y: number }[]) {
            // console.log("Traps list", data);
            setTraps(data);
        }

        function onRpsResult(data: { result: string; move: string }) {
            // console.log("RPS result", data);
            setRpsResult(data);
            setRpsStart(false);
        }

        function onRpsStart() {
            // console.log("RPS start");
            setRpsStart(true);
        }

        function onDisableTracking() {
            setShowPlayer(false);
        }

        function onEnableTracking() {
            setShowPlayer(true);
        }

        function onCameraFrame(data: string) {
            setCameraFrame(data);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("players:move", onPositionChange);
        socket.on("traps:list", onTrapsList);
        socket.on("rps:start", onRpsStart);
        socket.on("rps:results", onRpsResult);
        socket.on("disable:tracking", onDisableTracking);
        socket.on("enable:tracking", onEnableTracking);
        socket.on("camera:sending", (data: string) => {
            onCameraFrame(data);
        });
    }, []);

    return {
        isConnected,
        position,
        socket,
        traps,
        rpsResult,
        rpsStart,
        showPlayer,
        cameraFrame,
    };
}

export default usePlayerPosition;
