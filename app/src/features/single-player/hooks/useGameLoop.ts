import { useEffect, useRef, useCallback } from "react"
import { GameLoop } from "../engine/GameLoop";

export const useGameLoop = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameEngineRef = useRef<GameLoop | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        const gameEngine = new GameLoop(canvas);
        gameEngineRef.current = gameEngine;
        gameEngine.start();

        return () => {
            gameEngine.stop();
        }
    }, []);

    const pause = useCallback(() => {
        gameEngineRef.current?.pause();
    }, []);

    const resume = useCallback(() => {
        gameEngineRef.current?.resume();
    }, []);

  return {
    // Atributes
    canvasRef,
    // Methods
    pause,
    resume
  }
}
