

export function getRankStyles (rank: number){
    switch(rank){
        case 1: // Gold
            return {
                wrapper: "bg-gradient-to-r from-yellow-600/20 to-transparent border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:from-yellow-600/30",
                rankText: "text-yellow-400 drop-shadow-[0_0_5px_#ca8a04]",
                suffix: "st"
            };
        case 2: // Silver 
            return {
                wrapper: "bg-gradient-to-r from-gray-300/20 to-transparent border-gray-400/40 shadow-[0_0_15px_rgba(209,213,219,0.15)] hover:from-gray-300/30",
                rankText: "text-gray-100 drop-shadow-[0_0_8px_#d1d5db]",
                suffix: "nd"
            };
        case 3: // Bronze
            return {
                wrapper: "bg-gradient-to-r from-orange-800/30 to-transparent border-orange-700/50 shadow-[0_0_15px_rgba(194,65,12,0.2)] hover:from-orange-800/40",
                rankText: "text-orange-400 drop-shadow-[0_0_8px_#ea580c]",
                suffix: "rd"
            };
        default: // Normal styling for 4th place and below
            return {
                wrapper: "bg-white/5 border-white/10 hover:bg-white/10",
                rankText: "text-slate-500 font-normal",
                suffix: "th"
            };
    }
}