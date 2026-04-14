import { useEffect, useRef } from "react"
import { GameLoop } from "../engine/GameLoop";

export const useGameLoop = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        const gameEngine = new GameLoop(canvas);
        gameEngine.start();

        return () => {
            gameEngine.stop();
        }
    }, []);
  return {
    // Atributes
    canvasRef
    // Methods
  }
}
