import { useEffect, useRef, useCallback } from "react"
import { GameLoop } from "../engine/GameLoop";

export const useGameLoop = (onStateChange?: (state: any) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameEngineRef = useRef<GameLoop | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        const gameEngine = new GameLoop(canvas, onStateChange);
        gameEngineRef.current = gameEngine;
        gameEngine.start();

        return () => {
            gameEngine.stop();
        }
    }, [onStateChange]);

    const pause = useCallback(() => {
        gameEngineRef.current?.pause();
    }, []);

    const resume = useCallback(() => {
        gameEngineRef.current?.resume();
    }, []);

    const restart = useCallback(() => {
      gameEngineRef.current?.restart();
    }, []);

  return {
    // Atributes
    canvasRef,
    // Methods
    pause,
    resume,
    restart
  }
}
