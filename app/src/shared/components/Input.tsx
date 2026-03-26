import type { ColorType } from "../types/color.types";

type InputType = 'text' | 'password' | 'email';

interface Props {
    type?: InputType;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder?: string;
    color?: ColorType;
}

const inputColors: Record<ColorType, string> = {
    pink: 'border-[#d946ef] shadow-[0_0_15px_#d946ef] focus:shadow-[0_0_25px_#d946ef]',
    blue: 'border-cyan-400 shadow-[0_0_15px_#22d3ee] focus:shadow-[0_0_25px_#22d3ee]',
    yellow: 'border-yellow-400 shadow-[0_0_15px_#facc15] focus:shadow-[0_0_25px_#facc15]',
    purple: 'border-purple-500 shadow-[0_0_15px_#a855f7] focus:shadow-[0_0_25px_#a855f7]',
    red: 'border-red-500 shadow-[0_0_15px_#ef4444] focus:shadow-[0_0_25px_#ef4444]',
    green: 'border-green-500 shadow-[0_0_15px_#22c55e] focus:shadow-[0_0_25px_#22c55e]',
};

export const Input = ({ 
    type = "text", 
    value, 
    onChange, 
    placeHolder = "", 
    color = 'pink' 
}: Props) => {
  return (
    <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeHolder} 
        className={`font-sans text-xl border-2 rounded-xl px-4 py-3 mb-6 outline-none w-full max-w-sm bg-transparent placeholder-[#94a3b8] text-white transition-shadow duration-300 ${inputColors[color]}`}
    />
  );
}
