import React, { useEffect, useRef, useState } from "react";
import TonneauIcon from "../assets/tonneau.ico";
import FlecheIco from "../assets/fleche.ico";
import FlecheIcoH from "../assets/flecheH.ico";
import FlecheIcoG from "../assets/flecheG.ico";
import FlecheIcoB from "../assets/flecheB.ico";
import FiletIco from "../assets/filet.ico";
import Relentirico from "../assets/relentir.ico";
import Tourelle from "../assets/tourelle.gif";
import ReactSVG from "../assets/react.svg";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useDrag, DragPreviewImage } from "react-dnd";

type Trap = {
  name: string;
  images: string[];
};

const ItemTypes = {
  ICON: "icon",
};

interface TrapBlock {
  trapItem: {
    id: number;
    label: string;
  }[];
}

const traps: Trap[] = [
  { name: "Filets", images: [FiletIco] },
  { name: "Zone de Ralentissement", images: [Relentirico] },
  {
    name: "Flèche",
    images: [FlecheIco, FlecheIcoH, FlecheIcoG, FlecheIcoB],
  },
  { name: "Tonneau explosif", images: [TonneauIcon] },
  { name: "Tourelle", images: [Tourelle, TonneauIcon] },
  { name: "Tourelle", images: [Tourelle, TonneauIcon] },
];

const Icon = ({ icon }: { icon: { id: number; label: string } }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.ICON,
    item: { id: icon.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <DragPreviewImage connect={preview} src={ReactSVG} />
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: "2rem",
          cursor: "move",
          display: "flex",
          alignItems: "center",
          border: "1px solid #000",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "10px",
          // minWidth: 100,
        }}
      >
        {icon.label}
      </div>
    </>
  );
};

const TrapBlock: React.FC<TrapBlock> = ({ trapItem }) => {
  // On crée un tableau d'index pour suivre l'image actuelle de chaque piège
  const [imageIndexes, setImageIndexes] = useState<number[]>(
    new Array(traps.length).fill(0),
  );
  console.log(trapItem);

  const handleImageChange = (trapIndex: number) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[trapIndex] =
        (newIndexes[trapIndex] + 1) % traps[trapIndex].images.length;
      return newIndexes;
    });
  };

  return (
    <>
      <div
        style={{
          width: "350px",
          border: "2px solid #000",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
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

        {
          //     traps.map((trap, index) => (
          //   <div
          //     key={index}
          //     style={{
          //       display: "flex",
          //       alignItems: "center",
          //       border: "1px solid #000",
          //       borderRadius: "5px",
          //       padding: "10px",
          //       marginBottom: "10px",
          //     }}
          //   >
          //     <img
          //       src={trap.images[imageIndexes[index]]}
          //       alt={trap.name}
          //       style={{ width: "30px", height: "30px", marginRight: "10px" }}
          //     />
          //
          //     {trap.images.length > 1 && (
          //       <AutorenewIcon
          //         onClick={() => handleImageChange(index)}
          //         style={{
          //           width: "20px",
          //           height: "20px",
          //           cursor: "pointer",
          //           marginLeft: "20px",
          //         }}
          //       />
          //     )}
          //     <p>{trap.name}</p>
          //   </div>
          // ))
        }

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {trapItem.map((icon) => (
            <Icon key={icon.id} icon={icon} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrapBlock;
