import React, { useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainPage from "../components/MainPage.tsx";
import usePlayerPosition from "../hooks/SocketHook.tsx";
import { useNavigate } from "react-router-dom";
import TrapBlock from "../components/TrapBlock.tsx";
import TrapDescription from "../components/TrapDescription.tsx";
import Chat from "../components/ChatModal.tsx";

const ItemTypes = {
    ICON: "icon",
};

const iconsData = [
    { id: 1, label: "⚡", name: "Foudre", description: "La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus v La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus, La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus, La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus, La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus, La description de l'icone 1, foudre de zeus La description de l'icone 1, foudre de zeus " },
    { id: 2, label: "🔥", name: "Feu", description: "La description de l'icone 2, feu des enfers..." },
    { id: 3, label: "🌟", name: "Etoile", description: "La description de l'icone 3, étoile..." },
];

const Cell = ({
    x,
    y,
    onDrop,
    hasPlayer,
}: {
    x: number;
    y: number;
    onDrop: (x: number, y: number, itemId: number) => void;
    hasPlayer: boolean;
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ICON,
        drop: (item: { id: number }) => onDrop(x, y, item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: "solid 1px black",
                width: "2rem",
                height: "2rem",
                position: "relative",
                backgroundColor: isOver ? "lightgreen" : "white",
            }}
        >
            {hasPlayer && (
                <div
                    style={{
                        width: "1rem",
                        height: "1rem",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
};

const GameRows = ({
    rowIndex,
    playerPosition,
    onDrop,
}: {
    rowIndex: number;
    playerPosition: { x: number; y: number };
    onDrop: (x: number, y: number, itemId: number) => void;
}) => {
    return (
        <>
            {Array.from({ length: 9 }, (_, colIndex) => (
                <Cell
                    key={colIndex}
                    x={colIndex}
                    y={rowIndex}
                    onDrop={onDrop}
                    hasPlayer={colIndex === playerPosition.x && rowIndex === playerPosition.y}
                />
            ))}
        </>
    );
};

const Game: React.FC = () => {
    const { isConnected, position, socket } = usePlayerPosition();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const room = searchParams.get("player");

    let roomInformations: { code: string; creator: string; players: string[]; gods: string[] };

    useEffect(() => {
        socket.on("rooms:join", (data: { code: string; creator: string; players: string[]; gods: string[] } | { error: string }) => {
            if ("error" in data) {
                alert(data.error);
                navigate("/");
            } else {
                roomInformations = data;
                socket.on("rooms:events", (data: { code: string; creator: string; players: string[]; gods: string[] }) => {
                    roomInformations = data;
                });
            }
            socket.off("rooms:join");
        });

        if (room) {
            socket.emit("rooms:join", { code: room, joinAs: "god" });
        } else {
            navigate("/");
        }
    }, []);

    const handleDrop = (x: number, y: number, itemId: number) => {
        socket.emit("traps:request", {
            x: x,
            y: y,
            trapType: "crossbow_down_prefab",
        });
    };

    const [selectedTrap, setSelectedTrap] = useState(iconsData[0]);

    return (
        <DndProvider backend={HTML5Backend}>
            <MainPage>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <h1>LoopTrap</h1>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(9, 2rem)",
                            gridTemplateRows: "repeat(9, 2rem)",
                        }}
                    >
                        {Array.from({ length: 9 })
                            .map((_, rowIndex) => rowIndex)
                            .reverse()
                            .map((rowIndex) => (
                                <GameRows
                                    rowIndex={rowIndex}
                                    key={rowIndex}
                                    playerPosition={position}
                                    onDrop={handleDrop}
                                />
                            ))}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            flexWrap: "wrap",
                        }}
                    >
                        <TrapBlock trapItem={iconsData} onSelectTrap={setSelectedTrap} />
                        <TrapDescription trapItem={selectedTrap} />
                    </div>
                </div>

                <Chat socket={socket} />
            </MainPage>
        </DndProvider>
    );
};
export default Game;
