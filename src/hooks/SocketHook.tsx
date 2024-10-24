import { useEffect, useState } from "react";
// @ts-ignore
import { socket } from "../socket";

function usePlayerPosition() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [traps, setTraps] = useState([{ x: 0, y: 0 }]);
  const [rpsResult, setRpsResult] = useState<{ result: string; move: string } | null>(null);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Disconnected");
      setIsConnected(false);
    }

    function onPositionChange(data: { x: number; y: number }) {
      console.log("Position change", data);
      setPosition({ x: Math.floor(data.x), y: Math.floor(data.y) });
    }

    function onTrapsList(data: { x: number; y: number }[]) {
      console.log("Traps list", data);
      setTraps(data);
    }

    function onRpsResult(data: { result: string; move: string }) {
      console.log("RPS result", data);
      setRpsResult(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("players:move", onPositionChange);
    socket.on("traps:list", onTrapsList);
    socket.on("rps:results", onRpsResult);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("players:move", onPositionChange);
      socket.off("traps:list", onTrapsList);
      socket.off("rps:results", onRpsResult);
    };
  }, []);

  return { isConnected, position, socket, traps, rpsResult };
}

export default usePlayerPosition;
