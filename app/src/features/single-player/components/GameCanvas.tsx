import { useGameLoop } from "../hooks/useGameLoop"

export const GameCanvas = () => {

    const { canvasRef } = useGameLoop();
    
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block bg-black"
    ></canvas>
  )
}
