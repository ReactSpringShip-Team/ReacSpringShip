import { useState } from "react";
import { HUD } from "../shared/components/HUD"
import { createPortal } from "react-dom";
import { PauseMenuModal } from "../shared/components/PauseMenuModal";
import { GameOverModal } from "../shared/components/GameOverModal";

export const SinglePlayerPage = () => {

  const [lives, seLives] = useState<number>(3);
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showGameOver, setGameOver] = useState(false);

  const userName = 'user';

  return (
    <div className="min-h-screen bg-[#051124] flex flex-col text-white pt-4">

      <HUD lives={lives} time={time} score={score} username={userName} />

      <div id="canvas" className="flex-1 bg-gray-500 w-full "></div>

      {/* === Modals ===*/}
      {
        showPauseMenu && createPortal(
          <PauseMenuModal onContinue={ () => setShowPauseMenu(false)} onExit={ () => setShowPauseMenu(false)} />,
          document.body
        )
      }

      {
        showGameOver && createPortal(
          <GameOverModal onExit={ () => setGameOver(false)} />, 
          document.body
        )
      }
    </div>
  )
}
