import React, { useState, useRef } from 'react';
import './_warehouseselection.scss';

const unSelectedStyle = {
  width: 28.83,
  height: 26.93,
  background:
    'linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%), linear-gradient(0deg, white 0%, white 100%)',
  borderLeft: '2px #0F62FE solid',
  borderTop: '1px #0F62FE solid',
  borderRight: '4px #0F62FE solid',
  borderBottom: '2px #0F62FE solid',
};

const selectedStyle = {
  width: 28.83,
  height: 26.93,
  background: '#0F62FE',
  borderLeft: '4px rgba(255, 255, 255, 0.50) solid',
  borderTop: '2px rgba(255, 255, 255, 0.50) solid',
  borderRight: '2px rgba(255, 255, 255, 0.50) solid',
};

const Square = () => {
  const [selected, setSelected] = useState(false);
  return (
    <div
      style={selected ? selectedStyle : unSelectedStyle}
      onClick={() => {
        setSelected(!selected);
      }}
    />
  );
};
const WarehouseSelection = () => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 1.1 : 0.9;
    setScale((prevScale) => prevScale * delta);
  };

  const handleMouseDown = (event) => {
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex p-5">
      <div
        className="canvas-container"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <div
          className="canvas"
          ref={canvasRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <Square></Square>
        </div>
      </div>
    </div>
  );
};

export default WarehouseSelection;
