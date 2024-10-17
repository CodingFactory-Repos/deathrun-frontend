import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainPage from "../components/MainPage.tsx";

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
}: {
  x: number;
  y: number;
  onDrop: (x: number, y: number, itemId: number) => void;
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
        backgroundColor: isOver ? "lightgreen" : "white",
      }}
    />
  );
};

const GameRows = ({
  rowIndex,
  onDrop,
}: {
  rowIndex: number;
  onDrop: (x: number, y: number, itemId: number) => void;
}) => {
  return (
    <>
      {Array.from({ length: 9 }, (_, colIndex) => (
        <Cell key={colIndex} x={colIndex} y={rowIndex} onDrop={onDrop} />
      ))}
    </>
  );
};

const Game: React.FC = () => {
  const handleDrop = (x: number, y: number, itemId: number) => {
    console.log(`Item ${itemId} dropped on cell (x: ${x}, y: ${y})`);
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
