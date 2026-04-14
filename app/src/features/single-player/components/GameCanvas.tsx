import React from "react";

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-black"
    ></canvas>
  );
};