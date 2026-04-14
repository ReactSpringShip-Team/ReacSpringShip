import { useState } from "react";
import { createPortal } from "react-dom";

import { GameOverModal, HUD, PauseMenuModal } from "../../../shared";
import { GameCanvas } from "./GameCanvas";

export const SinglePlayerGame = () => {
  const [lives, seLives] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  const userName = 'user';

  return (
    <div className="min-h-screen bg-[#051124] flex flex-col text-white pt-4">
      <HUD lives={lives} time={time} score={score} username={userName} />

      <div className="flex-1 w-full relative">
        <GameCanvas/>
      </div>

      {/* === Modals ===*/}
      {
        showPauseMenu && createPortal(
          <PauseMenuModal onContinue={() => setShowPauseMenu(false)} onExit={() => setShowPauseMenu(false)} />,
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
