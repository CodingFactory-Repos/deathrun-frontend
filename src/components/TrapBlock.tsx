import React, { useState } from "react";
import Relentirico from "../assets/images/relentir.ico";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useDrag, DragPreviewImage } from "react-dnd";
import { TrapItem, TrapContainer } from "../types/TrapTypes.ts";

const ItemTypes = {
    ICON: "icon",
};

const Icon = ({
    icon,
    onHoverTrap,
}: {
    icon: TrapItem;
    onHoverTrap: (icon: TrapItem | null) => void;
}) => {
    const [currentTrapIndex, setCurrentTrapIndex] = useState(0);
    const currentTrap = icon.trapData[currentTrapIndex];

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.ICON,
            item: { id: icon.id, trapData: currentTrap },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [currentTrap]
    );

    const handleTrapChange = () => {
        setCurrentTrapIndex(
            (prevIndex) => (prevIndex + 1) % icon.trapData.length
        );
    };

    return (
        <>
            <DragPreviewImage
                connect={preview}
                src={currentTrap?.image || Relentirico}
            />
            <div
                ref={drag}
                onMouseEnter={() => onHoverTrap(icon)}
                onMouseLeave={() => onHoverTrap(null)}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontSize: "2rem",
                    cursor: "move",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    minWidth: 100,
                    position: "relative",
                }}
            >
                <span
                    style={{
                        fontSize: 18,
                        position: "absolute",
                        top: 33,
                        left: 5,
                    }}
                >
                    {icon.cost}
                </span>
                {icon.trapData.length > 0 ? (
                    <img
                        src={currentTrap?.image}
                        alt={icon.label}
                        style={{ height: 40 }}
                    />
                ) : (
                    icon.label
                )}

                {icon.trapData.length > 1 && (
                    <AutorenewIcon
                        onClick={handleTrapChange}
                        style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                    />
                )}
            </div>
        </>
    );
};

const TrapBlock: React.FC<TrapContainer> = ({ trapItem, onHoverTrap }) => {
    return (
        <>
            <div
                style={{
                    width: "350px",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        fontSize: "24px",
                    }}
                >
                    TRAPS
                </h2>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {trapItem.map((icon) => (
                        <Icon
                            key={icon.id}
                            icon={icon}
                            onHoverTrap={onHoverTrap}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TrapBlock;
