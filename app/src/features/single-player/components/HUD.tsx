import React, { useEffect, useState } from "react";
import { Heart, Timer, Trophy, User } from "lucide-react";

interface HUDProps {
  lives: number;
  time: number;
  score: number;
  username: string;
}

export const HUD: React.FC<HUDProps> = ({ lives, time, score, username }) => {
  const [displayTime, setDisplayTime] = useState(time);

  // Animación suave para el contador de tiempo (si fuera necesario, aunque el tiempo cambia cada segundo)
  // En este caso, el tiempo viene en segundos, así que simplemente lo formateamos.
  useEffect(() => {
    setDisplayTime(time);
  }, [time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full p-4 z-40 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        
        {/* Jugador y Vidas */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="p-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
              <User size={18} className="text-cyan-400" />
            </div>
            <span className="font-bold tracking-wider text-cyan-100 uppercase text-sm">
              {username}
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                size={22}
                className={`transition-all duration-500 ${
                  i < lives
                    ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] scale-100"
                    : "text-gray-600 fill-transparent scale-90 opacity-40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tiempo (Contador Central) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-black/40 backdrop-blur-md border-b-2 border-x-2 border-cyan-500/40 px-8 py-2 rounded-b-2xl shadow-[0_5px_15px_rgba(6,182,212,0.2)] flex flex-col items-center min-w-[140px]">
            <div className="flex items-center gap-2 mb-0.5">
              <Timer size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 font-bold">
                Misión
              </span>
            </div>
            <span className="text-3xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-widest">
              {formatTime(displayTime)}
            </span>
          </div>
        </div>

        {/* Puntuación */}
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md border border-yellow-500/30 px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.1)] group">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-500/70 font-bold">
              Puntos
            </span>
            <span className="text-2xl font-mono font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
              {score.toLocaleString().padStart(6, '0')}
            </span>
          </div>
          <div className="p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/50 group-hover:scale-110 transition-transform">
            <Trophy size={20} className="text-yellow-400" />
          </div>
        </div>

      </div>

      {/* Decoración lateral opcional */}
      <div className="fixed top-0 left-0 w-1 h-32 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
      <div className="fixed top-0 right-0 w-1 h-32 bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
    </div>
  );
};
