import { useEffect, useState } from 'react';
import { socket } from '../socket';

function PositionPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onConnect() {
      console.log('Connected');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('Disconnected');
      setIsConnected(false);
    }

    function onPositionChange(data: { x: number; y: number }) {
      console.log('Position change', data);
      setPosition(data);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('players:move', onPositionChange);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <>
      <div>
        Connected: {isConnected ? 'Yes' : 'No'}
      </div>
      <div>
        Position: X: {position.x}, Y: {position.y}
      </div>
    </>
  );
}

export default PositionPage;
