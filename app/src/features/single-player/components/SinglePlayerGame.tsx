import { useState, useEffect, useCallback, type RefObject } from "react";
import { createPortal } from "react-dom";

import { GameOverModal, HUD } from "../../../shared";
import { GameCanvas } from "./GameCanvas";
import { PauseMenu } from "./PauseMenu";
import { useGameLoop } from "../hooks/useGameLoop";
import { useNavigate } from "react-router-dom";

export const SinglePlayerGame = () => {
  const [lives, seLives] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  const { canvasRef, pause, resume } = useGameLoop();

  const navigate = useNavigate();

  const handlePause = useCallback(() => {
    if (!showGameOver) {
      setShowPauseMenu(true);
      pause();
    }
  }, [showGameOver, pause]);

  const handleResume = useCallback(() => {
    setShowPauseMenu(false);
    resume();
  }, [resume]);

  const handleExit = () => {
    navigate('/home');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPauseMenu) {
          handleResume();
        } else {
          handlePause();
        }
      }
    };

    const handleBlur = () => {
      handlePause();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
    };
  }, [showPauseMenu, handlePause, handleResume]);

  const userName = 'user';

  return (
    <div className="min-h-screen bg-[#051124] flex flex-col text-white pt-4">
      <HUD lives={lives} time={time} score={score} username={userName} />

      <div className="flex-1 w-full relative">
        <GameCanvas canvasRef={canvasRef as RefObject<HTMLCanvasElement>} />
      </div>

      {/* === Modals ===*/}
      {
        showPauseMenu && createPortal(
          <PauseMenu onResume={handleResume} onExit={handleExit} />,
          document.body
        )
      }

      {
        showGameOver && createPortal(
          <GameOverModal onExit={() => setGameOver(false)} />, 
          document.body
        )
      }
    </div>
  );
};
