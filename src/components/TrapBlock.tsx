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
    name: string;
    description: string;
  }[];
  onSelectTrap: (icon: { id: number; label: string; name: string; description: string }) => void;
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

const Icon = ({ icon, onSelectTrap }: { icon: { id: number; label: string; name: string; description: string }; onSelectTrap: (icon: { id: number; label: string; name: string; description: string }) => void }) => {
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
        onClick={() => onSelectTrap(icon)} // Appelle onSelectTrap au clic
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
        }}
      >
        {icon.label}
      </div>
    </>
  );
};

const TrapBlock: React.FC<TrapBlock> = ({ trapItem, onSelectTrap }) => {
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

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {trapItem.map((icon) => (
            <Icon key={icon.id} icon={icon} onSelectTrap={onSelectTrap} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrapBlock;
