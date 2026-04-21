import React from "react";

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onExit: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
  onExit,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative p-10 bg-[#1a0b2e] border-2 border-purple-500 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.4)] flex flex-col items-center gap-8 min-w-[350px] animate-in fade-in zoom-in duration-300">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-purple-500/5 rounded-2xl -z-10"></div>

        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] uppercase tracking-[0.2em]">
          GAME OVER
        </h2>

        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-400 uppercase tracking-widest text-sm">Puntuación Final</p>
          <p className="text-4xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
            {score.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 mt-2">
          <button
            onClick={onRestart}
            className="w-full py-4 px-8 bg-purple-600 border border-purple-400 text-white font-bold rounded-xl hover:bg-purple-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] active:scale-95 uppercase tracking-widest"
          >
            VOLVER A JUGAR
          </button>
          
          <button
            onClick={onExit}
            className="w-full py-4 px-8 bg-transparent border border-gray-600 text-gray-400 font-bold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300 active:scale-95 uppercase tracking-widest"
          >
            SALIR AL MENÚ
          </button>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-2xl"></div>
      </div>
    </div>
  );
};
