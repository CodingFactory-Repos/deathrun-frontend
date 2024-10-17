import React, { useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {useLocation, useNavigate} from "react-router-dom";
import MainPage from "../components/MainPage.tsx";
import usePlayerPosition from "../hooks/SocketHook.tsx";
import router from "../routes/Router.tsx";

const ItemTypes = {
  ICON: "icon",
};

const iconsData = [
  { id: 1, label: "⚡" },
  { id: 2, label: "🔥" },
  { id: 3, label: "🌟" },
];

const Icon = ({ icon }: { icon: { id: number; label: string } }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ICON,
    item: { id: icon.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: "2rem",
        cursor: "move",
      }}
    >
      {icon.label}
    </div>
  );
};

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const player = searchParams.get("player");
  const navigate = useNavigate();


  useEffect(() => {
    socket.on("rooms:join", (data) => {
      if (data.error) {
        alert(data.error);
        navigate("/");
      }
    });

    if (player) {
      socket.emit("rooms:join", { code: player, joinAs: "player" });
    }
  }, []);

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
        <div style={{ width: "auto", backgroundColor: "" }}>
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
          <div>
            {iconsData.map((icon) => (
              <Icon key={icon.id} icon={icon} />
            ))}
          </div>
        </div>
      </MainPage>
    </DndProvider>
  );
};

export default Game;