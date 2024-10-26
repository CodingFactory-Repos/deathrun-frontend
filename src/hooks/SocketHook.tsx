import { useEffect, useState } from "react";
// @ts-ignore
import { socket } from "../socket";

function usePlayerPosition() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [traps, setTraps] = useState([{ x: 0, y: 0 }]);
	const [showPlayer, setShowPlayer] = useState(false);
	const [cameraFrame, setCameraFrame] = useState("");

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

		function onTrapsList(data: { x: number; y: number }[]) {
			console.log("Traps list", data);
			setTraps(data);
		}

		function onDisableTracking() {
			console.log(
				"Rooms corridor-----------------------------------------------------------------------------"
			);
			setShowPlayer(false);
		}

		function onEnableTracking() {
			console.log(
				"Enable tracking-----------------------------------------------------------------------------"
			);
			setShowPlayer(true);
		}

		function onCameraFrame(data: string) {
			setCameraFrame(data);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("players:move", onPositionChange);
		socket.on("traps:list", onTrapsList);
		socket.on("disable:tracking", onDisableTracking);
		socket.on("enable:tracking", onEnableTracking);
		socket.on("camera:sending", (data: string) => {
			onCameraFrame(data);
		});
	}, []);

	return { isConnected, position, socket, traps, showPlayer, cameraFrame };
}

export default usePlayerPosition;
