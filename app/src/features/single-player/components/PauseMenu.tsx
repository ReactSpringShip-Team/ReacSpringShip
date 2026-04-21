import React from "react";

interface PauseMenuProps {
  onResume: () => void;
  onExit: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ onResume, onExit }) => {
  const handleExit = () => {
    onExit();
    // const confirmExit = window.confirm(
    //   "¿Estás seguro de que quieres salir? No se guardará el score del juego actual."
    // );
    // if (confirmExit) {
    //   onExit();
    // }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative p-8 bg-[#0b1426] border-2 border-cyan-500 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)] flex flex-col items-center gap-6 min-w-[300px]">
        {/* Glow effect in the background */}
        <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl -z-10"></div>
        
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] uppercase tracking-widest">
          Pausa
        </h2>

        <div className="flex flex-col w-full gap-4 mt-4">
          <button
            onClick={onResume}
            className="w-full py-3 px-6 bg-transparent border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] active:scale-95"
          >
            REANUDAR
          </button>
          
          <button
            onClick={handleExit}
            className="w-full py-3 px-6 bg-transparent border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)] active:scale-95"
          >
            SALIR
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-50"></div>
      </div>
    </div>
  );
};
