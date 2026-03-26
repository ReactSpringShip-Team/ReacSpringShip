import type { ColorType } from "../types/color.types";

interface Props {
    text: string;
    onClick?: () => void;
    btnType?: 'submit' | 'button';
    color?: ColorType;
    textSize?: 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl';
    disabled?: boolean;
}

const colors: Record<ColorType, string> = {
    pink: 'border-[#db2777] text-[#db2777] shadow-[0_0_15px_#db2777] hover:bg-[#db2777]/20 hover:shadow-[0_0_25px_#db2777]',
    blue: 'border-cyan-400 text-cyan-400 shadow-[0_0_15px_#22d3ee] hover:bg-cyan-400/20 hover:shadow-[0_0_25px_#22d3ee]',
    yellow: 'border-yellow-400 text-yellow-400 shadow-[0_0_15px_#facc15] hover:bg-yellow-400/20 hover:shadow-[0_0_25px_#facc15]',
    purple: 'border-purple-500 text-purple-500 shadow-[0_0_15px_#a855f7] hover:bg-purple-500/20 hover:shadow-[0_0_25px_#a855f7]',
    red: 'border-red-500 text-red-500 shadow-[0_0_15px_#ef4444] hover:bg-red-500/20 hover:shadow-[0_0_25px_#ef4444]',
    green: 'border-green-500 text-green-500 shadow-[0_0_15px_#22c55e] hover:bg-green-500/20 hover:shadow-[0_0_25px_#22c55e]',
};

export const Button = ({ 
    text, 
    onClick, 
    btnType = 'button', 
    color = 'purple', 
    textSize = "text-xl",
    disabled = false
}: Props) => {
    return (
        <button 
            type={btnType}
            onClick={onClick}
            className={`font-sans ${textSize} border-2 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer uppercase tracking-wider font-black italic w-full max-w-sm ${colors[color]} disabled:bg-gray-300 disabled:opacity-50`}
            disabled={disabled}
        >
            {text}
        </button>
    );
}