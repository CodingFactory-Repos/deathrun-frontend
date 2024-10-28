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
    const [roomDeleted, setRoomDeleted] = useState(false);
    const [userDeath, setUserDeath] = useState(false);


    useEffect(() => {
        function onConnect() {
            // console.log("Connected");
            setIsConnected(true);
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

        function onRoomDeleted() {
            console.log("Room deleted");
            setRoomDeleted(true);
        }

        function onUserDeath() {
            console.log("User death");
            setUserDeath(true);
        }

        function onGameStart() {
            console.log("Game start");
        }

        function onRoomsEvent(data: any) {
            console.log("Rooms event", data);
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
        socket.on("rooms:deleted", onRoomDeleted);
        socket.on("user:death", onUserDeath);
        socket.on("rooms:start", onGameStart);
        socket.on("rooms:events", onRoomsEvent);
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
        roomDeleted,
        userDeath,
    };
}

export default usePlayerPosition;
