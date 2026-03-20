import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ColorType } from "../types/color.types";

interface Props {
    route?: string;
    color?: ColorType; 
}

const buttonStyles: Record<ColorType, { text: string; glow: string }> = {
    blue: {
        text: "text-cyan-500 hover:text-cyan-300",
        glow: "drop-shadow-[0_0_5px_#22d3ee] group-hover:drop-shadow-[0_0_15px_#67e8f9]"
    },
    pink: {
        text: "text-pink-500 hover:text-pink-300",
        glow: "drop-shadow-[0_0_5px_#ec4899] group-hover:drop-shadow-[0_0_15px_#f472b6]"
    },
    yellow: {
        text: "text-yellow-500 hover:text-yellow-300",
        glow: "drop-shadow-[0_0_5px_#eab308] group-hover:drop-shadow-[0_0_15px_#fde047]"
    },
    purple: {
        text: "text-purple-500 hover:text-purple-300",
        glow: "drop-shadow-[0_0_5px_#a855f7] group-hover:drop-shadow-[0_0_15px_#d8b4fe]"
    }
};

export const BackButton = ({ route = "/", color = "blue" }: Props) => {
  const currentStyle = buttonStyles[color];

  return (
     <Link 
        to={route}
        className={`absolute top-12 left-12 z-10 flex items-center gap-2 transition-all duration-300 group cursor-pointer ${currentStyle.text}`}
      >
        <ChevronLeft 
          size={36} 
          className={`transition-all duration-300 ${currentStyle.glow}`} 
        />
        <span className={`text-xl italic font-black uppercase tracking-widest transition-all duration-300 ${currentStyle.glow}`}>
          Back
        </span>
      </Link>
  );
}