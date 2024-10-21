import React, { useState } from "react";
import Relentirico from "../assets/relentir.ico";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useDrag, DragPreviewImage } from "react-dnd";

const ItemTypes = {
  ICON: "icon",
};

interface TrapBlock {
  trapItem: TrapItem[];
}

type TrapItem = {
  id: number;
  label: string;
  images: string[];
};

const Icon = ({ icon }: { icon: TrapItem }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.ICON,
    item: { id: icon.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % icon.images.length);
  };

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={icon.images[currentImageIndex] || Relentirico}
      />
      <div
        ref={drag}
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
        }}
      >
        {icon.images.length > 0 ? (
          <img
            src={icon.images[currentImageIndex]}
            alt={icon.label}
            style={{ height: 40 }}
          />
        ) : (
          icon.label
        )}

        {icon.images.length > 1 && (
          <AutorenewIcon
            onClick={handleImageChange}
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

const TrapBlock: React.FC<TrapBlock> = ({ trapItem }) => {
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
            <Icon key={icon.id} icon={icon} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrapBlock;
