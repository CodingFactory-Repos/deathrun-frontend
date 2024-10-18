import React from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainPage from "../components/MainPage.tsx";
import usePlayerPosition from "../hooks/SocketHook.tsx";
import TrapBlock from "../components/TrapBlock.tsx";

const ItemTypes = {
  ICON: "icon",
};

const iconsData = [
  { id: 1, label: "⚡" },
  { id: 2, label: "🔥" },
  { id: 3, label: "🌟" },
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
      {/* If the player is in this case place a red dot */}
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
          hasPlayer={
            colIndex === playerPosition.x && rowIndex === playerPosition.y
          }
        />
      ))}
    </>
  );
};

const Game: React.FC = () => {
  const { isConnected, position, socket } = usePlayerPosition();

  console.log("Position", position);
  console.log("isConnected", isConnected);

  const handleDrop = (x: number, y: number, itemId: number) => {
    console.log(`Item ${itemId} dropped on cell (x: ${x}, y: ${y})`);
    socket.emit("traps:request", {
      x: x,
      y: y,
      trapType: "crossbow_down_prefab",
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <MainPage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <h1>LoopTrap</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9, 2rem)",
              gridTemplateRows: "repeat(9, 2rem)",
            }}
          >
            {/* Using x and y */}
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
          <TrapBlock trapItem={iconsData} />
        </div>
      </MainPage>
    </DndProvider>
  );
};

export default Game;
