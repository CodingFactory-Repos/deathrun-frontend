import React, { useEffect, useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainPage from "../components/MainPage.tsx";
import usePlayerPosition from "../hooks/SocketHook.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import TrapBlock from "../components/TrapBlock.tsx";
import TrapDescription from "../components/TrapDescription.tsx";
import Chat from "../components/ChatModal.tsx";
import CrossBowDown from "../assets/images/crossbow_down.png";
import CrossBowLeft from "../assets/images/crossbow_side_left.png";
import CrossBowRight from "../assets/images/crossbow_side_right.png";
import CrossBowUp from "../assets/images/crossbow_up.png";
import BearTrap from "../assets/images/bear_trap.png";
import SpikeTrap from "../assets/images/spike_trap.png";
import toast from "react-hot-toast";
import { GameInfoHover, RoomInformations } from "../types/RoomTypes.ts";
//import gameBackground from "../assets/images/game_background.gif";
import { TrapDrop, TrapItem } from "../types/TrapTypes.ts";
import RockPaperScissors from "../components/RockPaperScissors.tsx";
// import { Button } from "@mui/material";
import BackgroundDeath from "../assets/images/gods/DeathBackground.gif";
import BackgroundChaos from "../assets/images/gods/ChaosBackground.jpg";
//import BackgroundGluttony from "../assets/images/gods/GluttonyBackground.png";
import BackgroundGluttony from "../assets/images/gods/GluttonyBackground.gif";
import BackgroundEnvy from "../assets/images/gods/EnvyBackground.png";
import BackgroundVanity from "../assets/images/gods/VanityBackground.png";
import BackgroundGreed from "../assets/images/gods/GreedBackground.png";
import BackgroundSloth from "../assets/images/gods/SlothBackground.png";

const backgrounds: Record<number, string> = {
    1: BackgroundGreed,
    2: BackgroundChaos,
    3: BackgroundGluttony,
    4: BackgroundEnvy,
    5: BackgroundDeath,
    6: BackgroundVanity,
    7: BackgroundSloth,
};
import StartButton from "../components/StartButton.tsx";
import GameInfo from "../components/GameInfo.tsx";
import FrameDisplay from "../components/FrameDisplay.tsx";
import DeathModal from "../components/DeathModal.tsx";

const ItemTypes = {
    ICON: "icon",
};

const iconsData: TrapItem[] = [
    {
        id: 1,
        label: "CrossBow",
        description: "",
        cost: 5,
        trapData: [
            {
                image: CrossBowLeft,
                trapType: "crossbow_side_left_prefab",
            },
            {
                image: CrossBowUp,
                trapType: "crossbow_up_prefab",
            },
            {
                image: CrossBowRight,
                trapType: "crossbow_side_right_prefab",
            },
            {
                image: CrossBowDown,
                trapType: "crossbow_down_prefab",
            },
        ],
    },
    {
        id: 2,
        label: "Bear Trap",
        description: "",
        cost: 1,
        trapData: [
            {
                image: BearTrap,
                trapType: "bear_trap_prefab",
            },
        ],
    },
    {
        id: 3,
        label: "Spike Trap",
        description: "",
        cost: 3,
        trapData: [
            {
                image: SpikeTrap,
                trapType: "spike_prefab",
            },
        ],
    },
];

const Cell = ({
    x,
    y,
    onDrop,
    hasPlayer,
    hasProps,
    hasTraps,
    trapsPlaced,
    showPlayer,
}: {
    x: number;
    y: number;
    onDrop: (x: number, y: number, item: TrapDrop) => void;
    hasPlayer: boolean;
    hasProps: boolean;
    hasTraps: boolean;
    trapsPlaced: { x: number; y: number }[];
    showPlayer: boolean;
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ICON,
        drop: (item: TrapDrop) => onDrop(x, y, item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const trap: { x: number; y: number; trapType?: string } | null =
        trapsPlaced?.find((trap) => trap.x === x && trap.y === y) || null;

    // Find the image of the trap
    const findTrapImage = (trapType: string): string | null => {
        for (const icon of iconsData) {
            const trapData = icon.trapData.find(
                (data) => data.trapType === trapType
            );
            if (trapData) return trapData.image;
        }
        return null;
    };

    const trapImage = trap?.trapType ? findTrapImage(trap.trapType) : null;

    return (
        <div
            ref={drop}
            style={{
                border: "solid 0.1px black",
                width: "2rem",
                height: "2rem",
                position: "relative",
                backgroundColor: hasProps
                    ? "gray"
                    : hasTraps
                      ? "rgba(255,255,255,0.8)"
                      : isOver
                        ? "lightgreen"
                        : "rgba(255,255,255,0.8)",
                pointerEvents:
                    hasProps || hasTraps || hasPlayer ? "none" : "auto",
            }}
        >
            {/* If the player is in this case place a red dot */}
            {hasPlayer && showPlayer && (
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

            {trapImage && trap && (
                <img
                    src={trapImage}
                    alt={trap.trapType}
                    style={{
                        width: "80%",
                        height: "80%",
                        // objectFit: "cover",
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
    propsPlaced,
    trapsPlaced,
    showPlayer,
}: {
    rowIndex: number;
    playerPosition: { x: number; y: number };
    onDrop: (x: number, y: number, item: TrapDrop) => void;
    propsPlaced: { x: number; y: number }[];
    trapsPlaced: { x: number; y: number }[];
    showPlayer: boolean;
}) => {
    return (
        <>
            {Array.from({ length: 9 }, (_, colIndex) => (
                <Cell
                    key={colIndex}
                    x={colIndex}
                    y={rowIndex}
                    onDrop={onDrop}
                    hasPlayer={
                        colIndex === playerPosition.x &&
                        rowIndex === playerPosition.y
                    }
                    hasProps={propsPlaced?.some(
                        (prop) => prop.x === colIndex && prop.y === rowIndex
                    )}
                    hasTraps={trapsPlaced?.some(
                        (trap) => trap.x === colIndex && trap.y === rowIndex
                    )}
                    trapsPlaced={trapsPlaced}
                    showPlayer={showPlayer}
                />
            ))}
        </>
    );
};

const Game: React.FC = () => {
    const { position, socket, traps, showPlayer, rpsStart, userDeath } =
        usePlayerPosition();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const room = searchParams.get("player");
    const [props, setProps] = useState([{ x: 0, y: 0 }]);
    const [trapsList, setTrapsList] = useState([{ x: 0, y: 0 }]);
    const [roomInformations, setRoomInformations] =
        useState<RoomInformations | null>(null);

    const { godId } = location.state ? location.state : { godId: 0 };

    useEffect(() => {
        if (traps) {
            setTrapsList(traps);
        }
    }, [traps]);

    useEffect(() => {
        if (rpsStart) {
            setOpenRps(true);
        }
    }, [rpsStart]);

    useEffect(() => {
        socket.on(
            "rooms:join",
            (
                data:
                    | RoomInformations
                    | {
                          error: string;
                      }
            ) => {
                if ("error" in data) {
                    toast.error(data.error);
                    navigate("/");
                } else {
                    setRoomInformations(data);
                    // console.log("Joined room", roomInformations);

                    setProps(data?.props || []);
                    setTrapsList(data?.traps || []);

                    // Après avoir rejoint la room plus besoin de l'écouter.
                    socket.on("rooms:events", (data: RoomInformations) => {
                        setRoomInformations(data);
                        setTrapsList(data?.traps);
                        setProps(data?.props);
                    });
                }

                socket.off("rooms:join");
            }
        );

        if (room) {
            socket.emit("rooms:join", {
                code: room,
                joinAs: "god",
                godId: godId,
            });
        } else {
            navigate("/");
        }
    }, []);

    const handleDrop = (x: number, y: number, item: TrapDrop) => {
        // console.log(`Item ${item.id} dropped on cell (x: ${x}, y: ${y})`);
        // console.log("Item", item);
        socket.emit("traps:request", {
            x: x,
            y: y,
            trapType: item.trapData.trapType,
        });
    };

    const [hoveredTrap, setHoveredTrap] = useState<
        TrapItem | GameInfoHover | null
    >(null);

    const [openRps, setOpenRps] = useState(false);

    // const handleOpenRps = () => setOpenRps(true);
    const handleCloseRps = () => setOpenRps(false);

    return (
        <DndProvider backend={HTML5Backend}>
            <MainPage
                componentStyle={{
                    backgroundImage: `url(${
                        backgrounds[godId] || BackgroundDeath
                    })`,
                    backgroundSize: "cover",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 20,
                        color: "white",
                    }}
                >
                    <h1>Godbless</h1>
                </div>
                <div
                    style={{
                        display: "flex",
                        // justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(9, 2rem)",
                            gridTemplateRows: "repeat(23, 2rem)",
                        }}
                    >
                        {/* Using x and y */}
                        {Array.from({ length: 23 })
                            .map((_, rowIndex) => rowIndex)
                            .reverse()
                            .map((rowIndex) => (
                                <GameRows
                                    rowIndex={rowIndex}
                                    key={rowIndex}
                                    playerPosition={position}
                                    propsPlaced={props}
                                    trapsPlaced={trapsList}
                                    onDrop={handleDrop}
                                    showPlayer={showPlayer}
                                />
                            ))}
                    </div>

                    <div
                        style={{
                            width: "100%",
                            marginLeft: 12,
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                marginBottom: 12,
                            }}
                        >
                            <TrapBlock
                                trapItem={iconsData}
                                onHoverTrap={setHoveredTrap}
                            />
                            {roomInformations !== null ? (
                                <GameInfo
                                    roomInformations={roomInformations}
                                    godId={godId}
                                    onHoverTrap={setHoveredTrap}
                                />
                            ) : (
                                <div>loading...</div>
                            )}

                            {hoveredTrap && (
                                <TrapDescription trapItem={hoveredTrap} />
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}
                            >
                                <Chat socket={socket} />
                                {roomInformations?.started === false && (
                                    <StartButton
                                        socket={socket}
                                        roomInformations={roomInformations}
                                        setRoomInformations={
                                            setRoomInformations
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        <div style={{ width: "100%" }}>
                            <FrameDisplay socket={socket} />
                        </div>
                        <RockPaperScissors
                            openRps={openRps}
                            handleCloseRps={handleCloseRps}
                        />
                        <DeathModal
                            open={userDeath}
                            roomInformations={roomInformations}
                        />
                    </div>
                </div>
            </MainPage>
        </DndProvider>
    );
};
export default Game;
