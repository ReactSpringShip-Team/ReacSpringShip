// src/components/game/PlayerLives.tsx
import { Heart } from 'lucide-react'; // Using lucide-react, but any SVG works

interface Props {
  lives: number;       
  totalSlots?: number; 
}

export const PlayerLives = ({ lives = 3, totalSlots = 3 }: Props) => {
  
  const slots = Array.from({ length: totalSlots });

  return (
    <div className="flex gap-2 p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl backdrop-blur-sm shadow-[0_0_10px_rgba(34,211,238,0.1)]">
      {slots.map((_, i) => {
        // Is this specific icon filled or empty?
        const isActive = i < lives;

        return (
          <div 
            key={i} 
            className={`transition-all duration-300 ${ isActive ? 'drop-shadow-[0_0_8px_##ce0c0c]' : 'drop-shadow-none' }`}
          >
            {/* The SVG Icon. We change the color and opacity based on state. */}
            <Heart 
              className={`w-10 h-10 transition-colors ${ isActive ? 'text-red-500' : 'text-slate-600 opacity-40' }`} 
              strokeWidth={isActive ? 1.5 : 1}
            />
          </div>
        );
      })}
    </div>
  );
};