import React from "react";
import MainPage from "../components/MainPage.tsx";
import tonneauIcon from '../assets/tonneau.ico';
import flecheico from '../assets/fleche.ico';
import filetico from '../assets/filet.ico';
import relentirico from '../assets/relentir.ico';

const traps = [
  { name: 'Filets', image: filetico },
  { name: 'Zone de Ralentissement', image: relentirico },
  { name: 'Flèche', image:flecheico },
  { name: 'Tonneau explosif', image: tonneauIcon }
];

const TrapBlock: React.FC = () => {
  return (
    <MainPage
      componentStyle={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "350px",
          border: "2px solid #000",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "white",
        }}
      >
      
        
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px", 
          fontSize: '24px',
        }}>
          TRAP 
        </h2>

        {traps.map((trap, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #000",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={trap.image}
              alt={trap.name}
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <p>{trap.name}</p>
          </div>
        ))}
      </div>
    </MainPage>
  );
};

export default TrapBlock;

