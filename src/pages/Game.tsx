import React, {useEffect} from "react";
import {DndProvider, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import MainPage from "../components/MainPage.tsx";
import usePlayerPosition from "../hooks/SocketHook.tsx";
import {useNavigate} from "react-router-dom";
import TrapBlock from "../components/TrapBlock.tsx";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  
};
const ItemTypes = {
    ICON: "icon",
};

const iconsData = [
    {id: 1, label: "⚡"},
    {id: 2, label: "🔥"},
    {id: 3, label: "🌟"},
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
    const [{isOver}, drop] = useDrop(() => ({
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
            {Array.from({length: 9}, (_, colIndex) => (
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
    const {isConnected, position, socket} = usePlayerPosition();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const room = searchParams.get("player");

    console.log("Position", position);
    console.log("isConnected", isConnected);

    let roomInformations: { code: string; creator: string; players: string[]; gods: string[] };

    useEffect(() => {
        socket.on("rooms:join", (data: { code: string; creator: string; players: string[]; gods: string[] } | {
            error: string
        }) => {
            if ("error" in data) {
                alert(data.error);
                navigate("/");
            } else {
                roomInformations = data;
                console.log("Joined room", roomInformations);

                // Après avoir rejoint la room plus besoin de l'écouter.
                socket.on("rooms:events", (data: { code: string, creator: string, players: string[], gods: string[] }) => {
                    roomInformations = data;
                    console.log("Room events", roomInformations);
                });
            }

            socket.off("rooms:join");
        });

        if (room) {
            socket.emit("rooms:join", {code: room, joinAs: "god"});
        } else {
            navigate("/");
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


      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
     

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
                        {Array.from({length: 9})
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
                    <TrapBlock trapItem={iconsData}/>
                </div>     
                <Box
                  component="form"
                  sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                  noValidate
                  autoComplete="off"
                >               
                 
                </Box>        
                <div>
                  <Button onClick={handleOpen}>Ecrire au joeur</Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" >
                          Message à envoyer au joueur
                        </Typography>
                        <Stack id="transition-modal-description"sx={{gap: 2, width: "100%"}}>
                          <TextField id="standard-basic" fullWidth label="Message" variant="standard" />
                          <Stack spacing={2} direction="row">
                            <Button variant="text">Envoyer </Button>
                          </Stack>
                        </Stack>
                      </Box>
                    </Fade>
                  </Modal>
                </div>

            
            </MainPage>
        </DndProvider>
    );
};
export default Game;
