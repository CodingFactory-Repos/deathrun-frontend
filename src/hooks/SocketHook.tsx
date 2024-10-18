import { useEffect, useState } from "react";
import { socket } from "../socket";

function usePlayerPosition() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [props, setProps] = useState([{x: 0, y: 0}]);

  useEffect(() => {
    function onConnect() {
      console.log("Connected");
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
      console.log("Disconnected");
      setIsConnected(false);
    }

    function onPositionChange(data: { x: number; y: number }) {
      console.log("Position change", data);
      setPosition({ x: Math.floor(data.x), y: Math.floor(data.y) });
    }

    function onPropsReceived(data: [{ x: number, y: number }]) {
      setProps(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("players:move", onPositionChange);
    socket.on("props:received", onPropsReceived);
  }, []);

  return { isConnected, position, socket, props };
}

export default usePlayerPosition;
