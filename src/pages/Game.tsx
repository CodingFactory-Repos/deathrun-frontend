import React, { useEffect, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainPage from '../components/MainPage.tsx';
import usePlayerPosition from '../hooks/SocketHook.tsx';
import { useNavigate } from 'react-router-dom';
import TrapBlock from '../components/TrapBlock.tsx';

interface roomInformations {
    code: string;
    creator: string;
    players: string[];
    gods: string[];
    props: { x: number; y: number }[];
    traps: { x: number; y: number }[];
}

const ItemTypes = {
    ICON: 'icon',
};

const iconsData = [
    { id: 1, label: '⚡' },
    { id: 2, label: '🔥' },
    { id: 3, label: '🌟' },
];

const Cell = ({
    x,
    y,
    onDrop,
    hasPlayer,
    hasProps,
    hasTraps,
}: {
    x: number;
    y: number;
    onDrop: (x: number, y: number, itemId: number) => void;
    hasPlayer: boolean;
    hasProps: boolean;
    hasTraps: boolean;
}) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.ICON,
        drop: (item: { id: number }) => onDrop(x, y, item.id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                border: 'solid 1px black',
                width: '2rem',
                height: '2rem',
                position: 'relative',
                backgroundColor: hasProps ? 'gray' : hasTraps ? 'darkred' : isOver ? 'lightgreen' : 'white',
                pointerEvents: hasProps || hasTraps || hasPlayer ? 'none' : 'auto',
            }}>
            {/* If the player is in this case place a red dot */}
            {hasPlayer && (
                <div
                    style={{
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
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
    propsPlaced,
    trapsPlaced,
}: {
    rowIndex: number;
    playerPosition: { x: number; y: number };
    onDrop: (x: number, y: number, itemId: number) => void;
    propsPlaced: [{ x: number; y: number }];
    trapsPlaced: [{ x: number; y: number }];
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
                    hasProps={propsPlaced.some(
                        prop => prop.x === colIndex && prop.y === rowIndex,
                    )}
                    hasTraps={trapsPlaced.some(
                        trap => trap.x === colIndex && trap.y === rowIndex,
                    )}
                />
            ))}
        </>
    );
};

const Game: React.FC = () => {
    const { isConnected, position, socket, traps } = usePlayerPosition();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const room = searchParams.get('player');
    const [props, setProps] = useState([{ x: 0, y: 0 }]);
    const [trapsList, setTrapsList] = useState([{ x: 0, y: 0 }]);

    console.log('Position', position);
    console.log('isConnected', isConnected);
    console.log('Props', props);

    useEffect(() => {
        if (traps) {
            setTrapsList(traps);
        }
    }, [traps]);

    let roomInformations: roomInformations;

    useEffect(() => {
        socket.on(
            'rooms:join',
            (
                data:
                    | roomInformations
                    | {
                        error: string;
                    },
            ) => {
                if ('error' in data) {
                    alert(data.error);
                    navigate('/');
                } else {
                    roomInformations = data;
                    console.log('Joined room', roomInformations);

                    setProps(roomInformations.props);
                    setTrapsList(roomInformations.traps || []);

                    // Après avoir rejoint la room plus besoin de l'écouter.
                    socket.on('rooms:events', (data: roomInformations) => {
                        roomInformations = data;
                        console.log('Room events', roomInformations);
                    });
                }

                socket.off('rooms:join');
            },
        );

        if (room) {
            socket.emit('rooms:join', { code: room, joinAs: 'god' });
        } else {
            navigate('/');
        }
    }, []);

    const handleDrop = (x: number, y: number, itemId: number) => {
        console.log(`Item ${itemId} dropped on cell (x: ${x}, y: ${y})`);
        socket.emit('traps:request', {
            x: x,
            y: y,
            trapType: 'crossbow_down_prefab',
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <MainPage>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                    <h1>LoopTrap</h1>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(9, 2rem)',
                            gridTemplateRows: 'repeat(9, 2rem)',
                        }}>
                        {/* Using x and y */}
                        {Array.from({ length: 9 })
                            .map((_, rowIndex) => rowIndex)
                            .reverse()
                            .map(rowIndex => (
                                <GameRows
                                    rowIndex={rowIndex}
                                    key={rowIndex}
                                    playerPosition={position}
                                    propsPlaced={props}
                                    trapsPlaced={trapsList}
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
