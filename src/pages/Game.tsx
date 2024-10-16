import React from "react";
import MainPage from "../components/MainPage.tsx";

const GameRows = ({ index }: { index: number }) => {
  return (
    <>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} style={{ border: "solid 1px black" }}>
          {index}
        </div>
      ))}
    </>
  );
};

const Game: React.FC = () => {
  return (
    <MainPage>
      <h1>Game</h1>
      <div style={{ width: "auto", backgroundColor: "" }}>
        <div style={{}}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(16,2rem)",
              gridTemplateRows: "repeat(16,2rem)",
            }}
          >
            {Array.from({ length: 16 }).map((_, index) => (
              <GameRows index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default Game;
