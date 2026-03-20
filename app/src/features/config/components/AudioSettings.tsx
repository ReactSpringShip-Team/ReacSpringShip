import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react'; 

export const AudioSettings = () => {
  const [volume, setVolume] = useState<number>(50);

  return (
    <div className="w-full flex flex-col items-center">
       <h4 className="text-3xl text-center italic font-bold uppercase font-sans text-cyan-400 drop-shadow-[0_0_8px_#22d3ee] mb-10">
        Audio
      </h4>

      <div className="w-full flex flex-col gap-6 p-6 border border-cyan-500/30 rounded-xl bg-[#051124]/50 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                <div className="flex justify-between items-center text-white">
          <label className="text-xl italic font-bold uppercase tracking-wider text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]">
            Master Volume
          </label>
          <span className="font-mono text-lg text-slate-300">{volume}%</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setVolume(v => (v > 0 ? 0 : 50))} className="text-cyan-400 hover:text-white drop-shadow-[0_0_5px_#22d3ee] transition-all cursor-pointer">
            {volume === 0 ? <VolumeX size={28} /> : <Volume2 size={28} />}
          </button>

          <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all" />
        </div>
      </div>
    </div>
  );
};